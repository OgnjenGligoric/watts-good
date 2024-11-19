package com.example.WattsGood.util;

import com.example.WattsGood.model.HeartbeatMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class HeartbeatConsumer {

    private static final Logger logger = LoggerFactory.getLogger(HeartbeatConsumer.class);
    private final ObjectMapper objectMapper;

    public HeartbeatConsumer(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @RabbitListener(queues = "heartbeat")
    public void consumeMessage(String message) {
        try {
            HeartbeatMessage heartbeatData = objectMapper.readValue(message, HeartbeatMessage.class);
            // logger.info("Received Heartbeat: {}", heartbeatData); // Log the heartbeat data
        } catch (Exception e) {
            // logger.error("Error processing message: {}", e.getMessage()); // Log errors
        }
    }
}