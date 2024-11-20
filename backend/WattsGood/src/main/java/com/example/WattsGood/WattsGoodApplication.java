package com.example.WattsGood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WattsGoodApplication {
	public static void main(String[] args) {
		SpringApplication.run(WattsGoodApplication.class, args);
	}
}
