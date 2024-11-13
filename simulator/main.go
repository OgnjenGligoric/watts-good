package main

import (
    "fmt"
    "log"
    "math/rand"
    "time"
    "os"
    influxdb2 "github.com/influxdata/influxdb-client-go/v2"
    "github.com/influxdata/influxdb-client-go/v2/api/write"
    "context"
    "github.com/streadway/amqp"
)

const (
    heartbeatInterval = 30 * time.Second
    consumptionInterval = 1 * time.Minute
)

func main() {
    influxdbSetup()
    householdID := "household_1" // Get from command-line args

    // Connect to RabbitMQ
    conn, err := amqp.Dial("amqp://admin:admin@localhost:5672/")
    if err != nil {
        log.Fatalf("Failed to connect to RabbitMQ: %v", err)
    }
    defer conn.Close()

    ch, err := conn.Channel()
    if err != nil {
        log.Fatalf("Failed to open a channel: %v", err)
    }
    defer ch.Close()

    go sendHeartbeats(householdID, ch)
    sendConsumptionData(householdID, ch)
}

func sendHeartbeats(householdID string, ch *amqp.Channel) {
    ticker := time.NewTicker(heartbeatInterval)
    defer ticker.Stop()

    for range ticker.C {
        message := fmt.Sprintf("Simulator %s online", householdID)
        err := ch.Publish(
            "",                      // exchange
            "heartbeat",             // routing key
            false,                   // mandatory
            false,                   // immediate
            amqp.Publishing{
                ContentType: "text/plain",
                Body:        []byte(message),
            })
        if err != nil {
            log.Printf("Failed to send heartbeat: %v", err)
        }
        log.Printf("Heartbeat sent: %s", message)
    }
}

func sendConsumptionData(householdID string, ch *amqp.Channel) {
    ticker := time.NewTicker(consumptionInterval)
    defer ticker.Stop()

    for range ticker.C {
        consumption := generateConsumption()
        message := fmt.Sprintf("Household %s consumption: %.2f W", householdID, consumption)

        err := ch.Publish(
            "",                           // exchange
            fmt.Sprintf("household.%s.consumption", householdID), // routing key
            false,                        // mandatory
            false,                        // immediate
            amqp.Publishing{
                ContentType: "text/plain",
                Body:        []byte(message),
            })
        if err != nil {
            log.Printf("Failed to send consumption data: %v", err)
        }
        log.Printf("Consumption data sent: %s", message)
    }
}

func generateConsumption() float64 {
    currentHour := time.Now().Hour()
    if currentHour >= 6 && currentHour <= 22 {
        return rand.Float64()*(800-500) + 500 // Daytime: higher usage
    }
    return rand.Float64()*(200-50) + 50 // Nighttime: lower usage
}


func influxdbSetup(){
    token := os.Getenv("INFLUXDB_TOKEN")
    url := "http://localhost:8086"
    client := influxdb2.NewClient(url, token)

    org := "ftn"
    bucket := "simulator"
    writeAPI := client.WriteAPIBlocking(org, bucket)
    for value := 0; value < 5; value++ {
        tags := map[string]string{
            "tagname1": "tagvalue1",
        }
        fields := map[string]interface{}{
            "field1": value,
        }
        point := write.NewPoint("measurement1", tags, fields, time.Now())
        time.Sleep(1 * time.Second) // separate points by 1 second

        if err := writeAPI.WritePoint(context.Background(), point); err != nil {
            log.Fatal(err)
        }
    }
}