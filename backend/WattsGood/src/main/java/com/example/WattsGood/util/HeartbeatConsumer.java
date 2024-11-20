package com.example.WattsGood.util;

import com.example.WattsGood.model.HeartbeatMessage;
import com.example.WattsGood.service.HouseholdService;
import com.example.WattsGood.service.InfluxDBService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@Transactional
public class HeartbeatConsumer {

    private static final Logger logger = LoggerFactory.getLogger(HeartbeatConsumer.class);
    private final ObjectMapper objectMapper;
    private final HouseholdService householdService;
    private final InfluxDBService influxDBService;

    public HeartbeatConsumer(ObjectMapper objectMapper, HouseholdService householdService, InfluxDBService influxDBService) {
        this.objectMapper = objectMapper;
        this.householdService = householdService;
        this.influxDBService = influxDBService;
    }

    @RabbitListener(queues = "heartbeat")
    public void consumeMessage(String message) {
        try {
            HeartbeatMessage heartbeatData = objectMapper.readValue(message, HeartbeatMessage.class);
            this.householdService.updateActivity(heartbeatData);
            logger.info("we are in");

        } catch (Exception e) {
            logger.error("Error processing message: {}", e.getMessage());
        }
    }

    @Scheduled(fixedRate = 1000) // Runs every 10 seconds
    public void checkInactiveHouseholds() {
        logger.info("Written to InfluxDB: householdId={}, active={}");
        
        try {
            Long currentTime = Instant.now().toEpochMilli();
            this.householdService.checkAndUpdateInactiveHouseholds(currentTime);

            // Write all households to InfluxDB
            householdService.getAllHouseholds().forEach(household -> {
                try {
                    influxDBService.writeActivityState(
                        household.getId().toString(), 
                        household.isActive()
                    );
                    logger.info("Written to InfluxDB: householdId={}, active={}",
                        household.getId(), household.isActive());
                } catch (Exception e) {
                    logger.error("Error writing household to InfluxDB: householdId={}, error={}",
                        household.getId(), e.getMessage());
                }
            });
        } catch (Exception e) {
            logger.error("Error during scheduled inactivity check: {}", e.getMessage());
        }
    }
}
