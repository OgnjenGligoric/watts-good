package com.example.WattsGood.model;

import java.time.LocalDateTime;
import java.util.List;

import com.example.WattsGood.util.PropertyRequest;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User owner;
    private String address;
    @Embedded
    private Location location;
    @ManyToOne(fetch = FetchType.EAGER)
    private City city;
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Household> households;
    private int numberOfFloors;
    private PropertyRequest requestStatus;
    private LocalDateTime submissionDate;
    private LocalDateTime completionDate;

}
