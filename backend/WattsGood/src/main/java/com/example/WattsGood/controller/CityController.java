package com.example.WattsGood.controller;

import com.example.WattsGood.model.City;
import com.example.WattsGood.model.Property;
import com.example.WattsGood.service.interfaces.ICityService;
import com.example.WattsGood.service.interfaces.IHouseholdService;
import com.example.WattsGood.service.interfaces.IPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/cities")
public class CityController {

    @Autowired
    private ICityService cityService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<City>> getAllCities() {
        try {
            List<City> cities = cityService.getAllCities();
            return new ResponseEntity<>(cities, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}