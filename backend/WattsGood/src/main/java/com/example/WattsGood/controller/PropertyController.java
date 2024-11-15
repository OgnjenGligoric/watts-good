package com.example.WattsGood.controller;
import com.example.WattsGood.model.Property;
import com.example.WattsGood.service.interfaces.ICityService;
import com.example.WattsGood.service.interfaces.IHouseholdService;
import com.example.WattsGood.service.interfaces.IPropertyService;
import com.example.WattsGood.util.PropertyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private IPropertyService propertyService;

    @Autowired
    private IHouseholdService householdService;


    // STAVITI DA NADJE OWNERA PO ULOGOVANOM KORISNIKU PA DA GA STAVI KAO OWNERA PROPERTIJA
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> createProperty(@RequestBody Property property) {
        try {
            Property createdProperty = propertyService.createProperty(property);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/{id}/accept",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Property> acceptPropertyRequest(@PathVariable Long id) {
        try {
            Property createdProperty = propertyService.updatePropertyRequest(id,PropertyRequest.Accepted);
            return new ResponseEntity<>(createdProperty,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}/decline")
    public ResponseEntity<Property> declinePropertyRequest(@PathVariable Long id) {
        try {
            Property createdProperty = propertyService.updatePropertyRequest(id,PropertyRequest.Declined);
            return new ResponseEntity<>(createdProperty,HttpStatus.OK);
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

    @GetMapping(value = "/pending", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Property>> getPropertiesWithPendingRequest() {
        try {
            List<Property> properties = propertyService.findByRequestStatus(PropertyRequest.Pending);
            return new ResponseEntity<>(properties, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/owner/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Property>> getPropertiesByOwnerId(@PathVariable Long id) {
        try {
            List<Property> properties = propertyService.findByOwner(id);
            return new ResponseEntity<>(properties, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
