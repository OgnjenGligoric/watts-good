package com.example.WattsGood.service.interfaces;

import java.util.List;

import com.example.WattsGood.model.Household;

public interface IHouseholdService {
    List<Household> getAllHouseholds();
    List<Household> searchHouseholdsBy(String city, Integer squareMeters, Integer floorNumber);

}
