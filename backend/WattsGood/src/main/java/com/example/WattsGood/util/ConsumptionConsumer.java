package com.example.WattsGood.util;

import com.example.WattsGood.model.ConsumptionMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class ConsumptionConsumer {

    private static final Logger logger = LoggerFactory.getLogger(ConsumptionConsumer.class);
    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate; 

    public ConsumptionConsumer(ObjectMapper objectMapper, SimpMessagingTemplate messagingTemplate) {
        this.objectMapper = objectMapper;
        this.messagingTemplate = messagingTemplate;
    }

    @RabbitListener(queues = "consumption")
    public void consumeMessage(String message) {
        try {
            ConsumptionMessage consumptionMessage = objectMapper.readValue(message, ConsumptionMessage.class);
            // logger.info("Received Consumption: {}", consumptionMessage); // Log the heartbeat data
            messagingTemplate.convertAndSend("/socket-publisher", consumptionMessage); // Broadcasting the message to clients
        } catch (Exception e) {
            // logger.error("Error processing message: {}", e.getMessage()); // Log errors
        }
    }
}