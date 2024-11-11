package com.example.WattsGood.repository;

import com.example.WattsGood.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPropertyRepository extends JpaRepository<Property, Long> {


}
