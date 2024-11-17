package main

import (
    "log"
    // "simulator/influxdb"
    "simulator/rabbitmq"
    "simulator/rtu"
    "os"
    // "fmt"
)

func main() {

    if len(os.Args) < 2{
        log.Fatalf("You have to pass in household id.")
    }
    householdID := os.Args[1]

    rabbitClient, err := rabbitmq.NewRabbitMQClient("amqp://admin:admin@localhost:5672/")
    if err != nil {
        log.Fatalf("Failed to connect to RabbitMQ: %v", err)
    }
    defer rabbitClient.Close()

    // Start heartbeats and consumption data in separate goroutines
    go rtu.StartHeartbeats(householdID, rabbitClient)
    rtu.StartConsumptionData(householdID, rabbitClient)
}
