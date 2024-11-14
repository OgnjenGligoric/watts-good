package com.example.WattsGood.repository;

import com.example.WattsGood.model.Property;
import com.example.WattsGood.util.PropertyRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPropertyRepository extends JpaRepository<Property, String> {

    List<Property> findByRequestStatus(PropertyRequest status);
}
