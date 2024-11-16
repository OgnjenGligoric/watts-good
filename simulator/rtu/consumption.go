package rtu

import (
    "encoding/json"
    "log"
    "math/rand"
    "time"
    "os"
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
            continue
        }
        log.Printf("Consumption data sent: %s", string(messageBody))
		logLastSuccessfullySent(householdID, messageBody)
        
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

func logLastSuccessfullySent(householdID string, messageBody []byte) {
	fileName := "household_consumption_" + householdID + ".bin"
	file, err := os.OpenFile(fileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatalf("Failed to open or create file: %v", err)
	}
	defer file.Close()

	// Write the message body to file
	if _, err := file.Write(messageBody); err != nil {
		log.Printf("Failed to write to file: %v", err)
	}
	if _, err := file.Write([]byte("\n")); err != nil {
		log.Printf("Failed to write newline to file: %v", err)
	}
}
