package rtu

import (
    "fmt"
    "log"
    "math/rand"
    "time"
    "simulator/rabbitmq"
)

const consumptionInterval = 1 * time.Minute

func StartConsumptionData(householdID string, client *rabbitmq.RabbitMQClient) {
    ticker := time.NewTicker(consumptionInterval)
    defer ticker.Stop()

    for range ticker.C {
        consumption := generateConsumption()
        message := fmt.Sprintf("Household %s consumption: %.2f W", householdID, consumption)
        routingKey := fmt.Sprintf("household.%s.consumption", householdID)

        if err := client.PublishMessage(routingKey, message); err != nil {
            log.Printf("Failed to send consumption data: %v", err)
        }
        log.Printf("Consumption data sent: %s", message)
    }
}

func generateConsumption() float64 {
    currentHour := time.Now().Minute() % 24
    if currentHour >= 6 && currentHour <= 22 {
        return rand.Float64()*(800-500) + 500 // Daytime: higher usage
    }
    return rand.Float64()*(200-50) + 50 // Nighttime: lower usage
}
