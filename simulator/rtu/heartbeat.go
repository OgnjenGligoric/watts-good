package rtu

import (
    "encoding/json"
    "log"
    "time"
    "simulator/rabbitmq"
)

const heartbeatInterval = 1 * time.Second

func StartHeartbeats(householdID string, client *rabbitmq.RabbitMQClient) {
    ticker := time.NewTicker(heartbeatInterval)
    defer ticker.Stop()

    for range ticker.C {
        data := rabbitmq.HeartbeatData{
            HouseholdID: householdID,
            Timestamp:   time.Now().Unix(),
        }

        // Serialize the HeartbeatData to JSON
        messageBody, err := json.Marshal(data)
        if err != nil {
            log.Printf("Failed to marshal heartbeat data to JSON: %v", err)
            continue
        }

        // Publish JSON message to the "heartbeat" topic
        if err := client.PublishMessage("heartbeat", messageBody); err != nil {
            log.Printf("Failed to send heartbeat: %v", err)
        }
        log.Printf("Heartbeat sent: %s", string(messageBody))
    }
}
