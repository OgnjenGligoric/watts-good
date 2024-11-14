package com.example.WattsGood.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitConfig {

    @Bean
    public Queue heartbeatQueue() {
        return new Queue("heartbeat", true);
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange("topic-exchange");
    }

    @Bean
    public Binding binding(Queue heartbeatQueue, TopicExchange exchange) {
        return BindingBuilder.bind(heartbeatQueue).to(exchange).with("heartbeat");
    }
}
