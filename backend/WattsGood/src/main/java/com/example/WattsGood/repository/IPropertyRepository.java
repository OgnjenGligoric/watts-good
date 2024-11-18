package com.example.WattsGood.repository;

import com.example.WattsGood.model.Property;
import com.example.WattsGood.util.PropertyRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPropertyRepository extends JpaRepository<Property, String> {

    Page<Property> findAllByRequestStatus(PropertyRequest status, Pageable pageable);
    Page<Property> findAllByOwnerId(Long ownerId, Pageable pageable);
    List<Property> findAllByOwnerId(Long ownerId);
}
