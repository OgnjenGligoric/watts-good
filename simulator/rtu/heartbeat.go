package rtu

import (
    "fmt"
    "log"
    "time"
    "simulator/rabbitmq"
)

const heartbeatInterval = 30 * time.Second

func StartHeartbeats(householdID string, client *rabbitmq.RabbitMQClient) {
    ticker := time.NewTicker(heartbeatInterval)
    defer ticker.Stop()

    for range ticker.C {
        message := fmt.Sprintf("Simulator %s online", householdID)
        if err := client.PublishMessage("heartbeat", message); err != nil {
            log.Printf("Failed to send heartbeat: %v", err)
        }
        log.Printf("Heartbeat sent: %s", message)
    }
}
