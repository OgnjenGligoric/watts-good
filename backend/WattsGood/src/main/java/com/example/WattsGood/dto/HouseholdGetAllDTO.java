package com.example.WattsGood.dto;

import com.example.WattsGood.model.Household;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HouseholdGetAllDTO {
    private Long id;
    private Long apartmentNumber;
    private Long propertyId; // Assuming only the property ID is needed
    private String address;
    private String cityName;
    private int squareMeters;
    private int floorNumber;
    private boolean isActive;
    private long lastHeartbeatTimestamp;
    public HouseholdGetAllDTO(Household household) {
        this.id = household.getId();
        this.apartmentNumber = household.getApartmentNumber();
        this.propertyId = household.getProperty() != null ? household.getProperty().getId() : null;
        this.address = household.getProperty().getAddress();
        this.cityName = household.getProperty().getCity().getName();
        this.squareMeters = household.getSquareMeters();
        this.floorNumber = household.getFloorNumber();
        this.isActive = household.isActive();
        this.lastHeartbeatTimestamp = household.getLastHeartbeatTimestamp();
    }
}