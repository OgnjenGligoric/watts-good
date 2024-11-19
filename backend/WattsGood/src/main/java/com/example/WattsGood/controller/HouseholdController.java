package com.example.WattsGood.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.WattsGood.dto.HouseholdGetAllDTO;
import com.example.WattsGood.model.Household;
import com.example.WattsGood.service.interfaces.IHouseholdService;

@RestController
@RequestMapping("/api/households")
public class HouseholdController {
    @Autowired
    private IHouseholdService householdService;
    private static final Logger logger = LoggerFactory.getLogger(HouseholdController.class);

    @GetMapping()
    public ResponseEntity<List<HouseholdGetAllDTO>> getAllHouseholds() {
        logger.info("Entered the getAllHouseholds endpoint.");

        try {
            List<Household> households = householdService.getAllHouseholds();
            List<HouseholdGetAllDTO> dtos = households.stream()
                                            .map(HouseholdGetAllDTO::new)
                                            .toList();
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}