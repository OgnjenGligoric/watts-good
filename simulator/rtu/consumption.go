package rtu

import (
    "encoding/json"
    "log"
    "math/rand"
    "time"
    "simulator/rabbitmq"
)

const consumptionInterval = 2 * time.Second

func StartConsumptionData(householdID string, client *rabbitmq.RabbitMQClient) {
    ticker := time.NewTicker(consumptionInterval)
    defer ticker.Stop()

    // Set initial time to the time when the simulator starts
    initialTime := time.Now()

    for range ticker.C {
        consumption := generateConsumption(initialTime)
        data := rabbitmq.ConsumptionData{
            HouseholdID: householdID,
            Consumption: consumption,
            Timestamp:   initialTime.Unix(),
        }

        // Serialize to JSON
        messageBody, err := json.Marshal(data)
        if err != nil {
            log.Printf("Failed to marshal data to JSON: %v", err)
            continue
        }

        // Publish JSON message
        if err := client.PublishMessage("consumption", messageBody); err != nil {
            log.Printf("Failed to send consumption data: %v", err)
        }
        log.Printf("Consumption data sent: %s", string(messageBody))

        // Increment the simulated time by one hour (for each minute that passes in real time)
        initialTime = initialTime.Add(time.Hour)
    }
}

func generateConsumption(currentTime time.Time) float64 {
    currentHour := currentTime.Hour()
    if currentHour >= 6 && currentHour <= 22 {
        return rand.Float64()*(800-500) + 500 // Daytime: higher usage
    }
    return rand.Float64()*(200-50) + 50 // Nighttime: lower usage
}
