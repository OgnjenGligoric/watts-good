package com.example.WattsGood.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ConsumptionMessage {

    @JsonProperty("household_id")
    private String householdId;

    @JsonProperty("consumption")
    private double consumption;

    @JsonProperty("timestamp")
    private long timestamp;

    // Constructors
    public ConsumptionMessage() {
    }

    public ConsumptionMessage(String householdId, double consumption, long timestamp) {
        this.householdId = householdId;
        this.consumption = consumption;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(String householdId) {
        this.householdId = householdId;
    }

    public double getConsumption() {
        return consumption;
    }

    public void setConsumption(double consumption) {
        this.consumption = consumption;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    // toString Method
    @Override
    public String toString() {
        return "ConsumptionMessage{" +
                "householdId='" + householdId + '\'' +
                ", consumption=" + consumption +
                ", timestamp=" + timestamp +
                '}';
    }
}
