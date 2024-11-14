package com.example.WattsGood.service;

import com.example.WattsGood.model.Household;
import com.example.WattsGood.model.Property;
import com.example.WattsGood.repository.IPropertyRepository;
import com.example.WattsGood.service.interfaces.IPropertyService;
import com.example.WattsGood.util.PropertyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService implements IPropertyService {

    @Autowired
    private IPropertyRepository propertyRepository;

    @Override
    public Property createProperty(Property property) {

        for (Household household : property.getHouseholds()) {
            household.setProperty(property);
        }
        property.setOwner(null);
        return propertyRepository.save(property);
    }

    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public Optional<Property> getById(Long id) {
        return propertyRepository.findById(String.valueOf(id));
    }

    @Override
    public List<Property> findByRequestStatus(PropertyRequest status) {
        return propertyRepository.findByRequestStatus(status);
    }


}
