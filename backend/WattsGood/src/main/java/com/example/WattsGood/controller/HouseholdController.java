package com.example.WattsGood.controller;

import java.time.Instant;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.WattsGood.dto.HouseholdGetAllDTO;
import com.example.WattsGood.model.Household;
import com.example.WattsGood.model.HouseholdActivity;
import com.example.WattsGood.service.InfluxDBService;
import com.example.WattsGood.service.interfaces.IHouseholdService;

@RestController
@RequestMapping("/api/households")
public class HouseholdController {

    private final InfluxDBService influxDBService;

    public HouseholdController(InfluxDBService influxDBService) {
        this.influxDBService = influxDBService;
    }

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

    @GetMapping("/search")
    public ResponseEntity<List<HouseholdGetAllDTO>> searchHouseholdsBy(
        @RequestParam(required = false) String city,
        @RequestParam(required = false) Integer squareMeters,
        @RequestParam(required = false) Integer floorNumber
    ) {
        logger.info("Entered the searchHouseholdsBy endpoint with parameters: city={}, squareMeters={}, floorNumber={}", city, squareMeters, floorNumber);

        try {
            List<Household> households = householdService.searchHouseholdsBy(city, squareMeters, floorNumber);
            List<HouseholdGetAllDTO> dtos = households.stream()
                                            .map(HouseholdGetAllDTO::new)
                                            .toList();
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred while searching households: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/activity/history")
public ResponseEntity<List<HouseholdActivity>> getActivityHistory(
    @RequestParam String householdId,
    @RequestParam Long startTime,  // Unix timestamp in milliseconds or seconds
    @RequestParam Long endTime     // Unix timestamp in milliseconds or seconds
) {
    logger.info("Entered the getActivityHistory endpoint with parameters: householdId={}, startTime={}, endTime={}", householdId, startTime, endTime);
    try {
        List<HouseholdActivity> activities = influxDBService.getActivityStateHistory(householdId, startTime, endTime);
        return new ResponseEntity<>(activities, HttpStatus.OK);
    } catch (Exception e) {
        logger.error("Error occurred while fetching activity history: {}", e.getMessage());
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
}
