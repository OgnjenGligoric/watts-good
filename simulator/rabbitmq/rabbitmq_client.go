package rabbitmq

import (
    "github.com/streadway/amqp"
)

type RabbitMQClient struct {
    connection *amqp.Connection
    channel    *amqp.Channel
}

func NewRabbitMQClient(url string) (*RabbitMQClient, error) {
    conn, err := amqp.Dial(url)
    if err != nil {
        return nil, err
    }

    ch, err := conn.Channel()
    if err != nil {
        return nil, err
    }

    return &RabbitMQClient{connection: conn, channel: ch}, nil
}

func (c *RabbitMQClient) PublishMessage(routingKey string, message []byte) error {
    err := c.channel.Publish(
        "",          // exchange
        routingKey,  // routing key
        false,       // mandatory
        false,       // immediate
        amqp.Publishing{
            ContentType: "application/json",
            Body:        message,
        },
    )
    return err
}

func (c *RabbitMQClient) Close() {
    c.channel.Close()
    c.connection.Close()
}

type ConsumptionData struct {
    HouseholdID string  `json:"household_id"`
    Consumption float64 `json:"consumption"`
    Timestamp   int64   `json:"timestamp"`
}

type HeartbeatData struct {
    HouseholdID string `json:"household_id"`
    Timestamp   int64  `json:"timestamp"`
}