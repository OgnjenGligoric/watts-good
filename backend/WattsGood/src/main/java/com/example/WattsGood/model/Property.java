package com.example.WattsGood.model;

import com.example.WattsGood.util.PropertyRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

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
    @JsonIgnore
    private List<Household> households;
    private int numberOfFloors;
    private PropertyRequest requestStatus;
    private LocalDateTime submissionDate;
    private LocalDateTime completionDate;

}
