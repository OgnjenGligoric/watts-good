package com.example.WattsGood.service;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.WriteApiBlocking;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import org.springframework.stereotype.Service;

import java.time.Instant;

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
                .time(Instant.now(), WritePrecision.MS);

        try {
            writeApi.writePoint(point);
            System.out.println("Activity state written to InfluxDB: " + point.toLineProtocol());
        } catch (Exception e) {
            System.err.println("Error writing activity state to InfluxDB: " + e.getMessage());
        }
    }
}
