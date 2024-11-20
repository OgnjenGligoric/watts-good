package com.example.WattsGood.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HouseholdActivity {
    private String householdId;
    private boolean isActive;
    private Date timestamp;
}
