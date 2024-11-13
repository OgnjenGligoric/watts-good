package main

import (
    "log"
    "simulator/influxdb"
    "simulator/rabbitmq"
    "simulator/rtu"
)

func main() {
    _ = influxdb.NewInfluxClient()
    householdID := "household_1" // Get from command-line args

    rabbitClient, err := rabbitmq.NewRabbitMQClient("amqp://admin:admin@localhost:5672/")
    if err != nil {
        log.Fatalf("Failed to connect to RabbitMQ: %v", err)
    }
    defer rabbitClient.Close()

    // Start heartbeats and consumption data in separate goroutines
    go rtu.StartHeartbeats(householdID, rabbitClient)
    rtu.StartConsumptionData(householdID, rabbitClient)
}
