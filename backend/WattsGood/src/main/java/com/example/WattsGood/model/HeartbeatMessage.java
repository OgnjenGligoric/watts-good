package com.example.WattsGood.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HeartbeatMessage {

    @JsonProperty("household_id")
    private long householdId;
    @JsonProperty("timestamp")
    private long timestamp;

    // Getters and Setters
    public long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(long householdId) {
        this.householdId = householdId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "HeartbeatData{" +
                "householdId='" + householdId + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
