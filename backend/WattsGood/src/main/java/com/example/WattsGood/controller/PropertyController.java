package com.example.WattsGood.controller;
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
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private IPropertyService propertyService;

    @Autowired
    private IHouseholdService householdService;

    @Autowired
    private ICityService cityService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
        try {
            Property createdProperty = propertyService.createProperty(property);
            return new ResponseEntity<>(createdProperty,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Property>> getAllProperties() {
        try {
            List<Property> properties = propertyService.getAllProperties();
            return new ResponseEntity<>(properties, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        try {
            Optional<Property> property = propertyService.getById(id);
            if (!property.isEmpty()) {
                return new ResponseEntity<>(property.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}