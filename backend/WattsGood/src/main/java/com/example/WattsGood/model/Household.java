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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long apartmentNumber;
    @ManyToOne(fetch = FetchType.LAZY)
    private Property property;
    private int squareMeters;
    private int floorNumber;

}
