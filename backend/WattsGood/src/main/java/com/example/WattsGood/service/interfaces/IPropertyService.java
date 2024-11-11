package com.example.WattsGood.service.interfaces;

import com.example.WattsGood.model.Property;

import java.util.List;
import java.util.Optional;

public interface IPropertyService {

    Property createProperty(Property property);
    List<Property> getAllProperties();
    Optional<Property> getById(Long id);
}
