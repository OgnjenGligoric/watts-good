package com.example.WattsGood.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Property property;
    @ManyToOne(fetch = FetchType.LAZY)
    private User owner;
    private int squareMeters;
    private int floorNumber;
    private boolean isActive;
    private long lastHeartbeatTimestamp;
}
