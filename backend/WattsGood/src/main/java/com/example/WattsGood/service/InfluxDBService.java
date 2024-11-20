package com.example.WattsGood.service;

import com.example.WattsGood.model.HouseholdActivity;
import com.influxdb.annotations.Measurement;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.QueryApi;
import com.influxdb.client.WriteApiBlocking;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class InfluxDBService {

    private final InfluxDBClient influxDBClient;

    public InfluxDBService(InfluxDBClient influxDBClient) {
        this.influxDBClient = influxDBClient;
    }

    public void writeActivityState(String householdId, boolean isActive) {
        WriteApiBlocking writeApi = influxDBClient.getWriteApiBlocking();

        Point point = Point.measurement("household_activity")
                .addTag("householdId", householdId)
                .addField("active", isActive)
                .time(Instant.now(), WritePrecision.S);

        try {
            writeApi.writePoint(point);
            System.out.println("Activity state written to InfluxDB: " + point.toLineProtocol());
        } catch (Exception e) {
            System.err.println("Error writing activity state to InfluxDB: " + e.getMessage());
        }
    }

    private List<HouseholdActivity> query(String fluxQuery) {
        List<HouseholdActivity> result = new ArrayList<>();
        QueryApi queryApi = this.influxDBClient.getQueryApi();
        
        try {
            List<FluxTable> tables = queryApi.query(fluxQuery);
            for (FluxTable fluxTable : tables) {
                List<FluxRecord> records = fluxTable.getRecords();
                for (FluxRecord fluxRecord : records) {
                    boolean isActive = Boolean.TRUE.equals(fluxRecord.getValue()); // safely handle boolean value
                    Date time = fluxRecord.getTime() != null ? Date.from(fluxRecord.getTime()) : null;
                    result.add(new HouseholdActivity(
                        fluxRecord.getMeasurement(), // measurement name (e.g., household_activity)
                        isActive,                    // activity state (boolean)
                        time                         // timestamp of the record
                    ));
                }
            }
        } catch (Exception e) {
            System.err.println("Error during Flux query execution: " + e.getMessage());
        }
        
        return result;
    }

    public List<HouseholdActivity> getActivityStateHistory(String householdId, Long startTime, Long endTime) {
        Instant startInstant = Instant.ofEpochSecond(startTime); // For seconds
        Instant endInstant = Instant.ofEpochSecond(endTime);     // For seconds
    
        String fluxQuery = String.format(
                "from(bucket: \"your-bucket-name\") " +
                "|> range(start: %s, stop: %s) " +  // Define your start and end times for the query
                "|> filter(fn: (r) => r[\"householdId\"] == \"%s\") " + // Filter by householdId
                "|> keep(columns: [\"_time\", \"active\"]) " +  // Keep only _time and active columns
                "|> sort(columns: [\"_time\"])",  // Sort by time ascending
                startInstant.toString(), endInstant.toString(), householdId);
    
        return this.query(fluxQuery);
    }

    
}
