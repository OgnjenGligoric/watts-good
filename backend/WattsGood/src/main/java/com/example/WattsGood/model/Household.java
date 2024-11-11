package com.example.WattsGood.model;

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
    private Long apartmentNumber;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Property property;
    private double squareMeters;
    private int floorNumber;

}
