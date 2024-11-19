package com.example.WattsGood.controller;

import com.example.WattsGood.model.Household;
import com.example.WattsGood.service.interfaces.IHouseholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/households")
public class HouseholdController {
    @Autowired
    private IHouseholdService householdService;

    @GetMapping()
    public ResponseEntity<List<Household>> getAllHouseholds() {
        try {
            List<Household> households = householdService.getAllHouseholds();
            return new ResponseEntity<>(households, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
