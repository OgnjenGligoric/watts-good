package com.example.WattsGood.util;

import com.example.WattsGood.model.HeartbeatMessage;
import com.example.WattsGood.service.HouseholdService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class HeartbeatConsumer {

    private static final Logger logger = LoggerFactory.getLogger(HeartbeatConsumer.class);
    private final ObjectMapper objectMapper;
    private final HouseholdService householdService;


    public HeartbeatConsumer(ObjectMapper objectMapper, HouseholdService householdService) {
        this.objectMapper = objectMapper;
        this.householdService = householdService;
    }

    @RabbitListener(queues = "heartbeat")
    public void consumeMessage(String message) {
        try {
            HeartbeatMessage heartbeatData = objectMapper.readValue(message, HeartbeatMessage.class);
            this.householdService.updateActivity(heartbeatData);
            // logger.info("Received Heartbeat: {}", heartbeatData); // Log the heartbeat data
        } catch (Exception e) {
            // logger.error("Error processing message: {}", e.getMessage()); // Log errors
        }
    }

    @Scheduled(fixedRate = 10000) // Runs every 10 seconds
    public void checkInactiveHouseholds() {
        try {
            Long currentTime = Instant.now().toEpochMilli();
            this.householdService.checkAndUpdateInactiveHouseholds(currentTime);
        } catch (Exception e) {
            logger.error("Error during scheduled inactivity check: {}", e.getMessage());
        }
    }
}