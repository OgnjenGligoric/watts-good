package com.example.WattsGood.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Household {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long apartmentNumber;
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private Property property;
    @ManyToOne(fetch = FetchType.EAGER)
    private User owner;
    private int squareMeters;
    private int floorNumber;
    private boolean isActive;
    private long lastHeartbeatTimestamp;
}
