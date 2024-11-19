package com.example.WattsGood.repository;

import com.example.WattsGood.model.Property;
import com.example.WattsGood.util.PropertyRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPropertyRepository extends JpaRepository<Property, String> {

    Page<Property> findAllByRequestStatus(PropertyRequest status, Pageable pageable);
    Page<Property> findAllByOwnerEmail(String ownerEmail, Pageable pageable);
    List<Property> findAllByOwnerId(Long ownerId);

    @Query("SELECT p FROM Property p WHERE p.owner.email = :ownerEmail " +
            "AND (:city IS NULL OR p.city.id = :city) " +
            "AND (:address IS NULL OR p.address LIKE %:address%) " +
            "AND (:requestStatus IS NULL OR p.requestStatus = :requestStatus) " +
            "AND (:search IS NULL OR p.address LIKE %:search% " +
            "OR p.city.name LIKE %:search% " +
            "OR p.owner.name LIKE %:search%) " +
            "ORDER BY " +
            "CASE WHEN :sortColumn = 'address' AND :sortDirection = 'asc' THEN p.address END ASC, " +
            "CASE WHEN :sortColumn = 'address' AND :sortDirection = 'desc' THEN p.address END DESC, " +
            "CASE WHEN :sortColumn = 'city' AND :sortDirection = 'asc' THEN p.city.name END ASC, " +
            "CASE WHEN :sortColumn = 'city' AND :sortDirection = 'desc' THEN p.city.name END DESC, " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'asc' THEN p.id END ASC, " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'desc' THEN p.id END DESC, " +
            "p.id")
    Page<Property> findFilteredPropertiesWithSearch(@Param("ownerEmail") String ownerEmail,
                                                    @Param("city") Long city,
                                                    @Param("address") String address,
                                                    @Param("requestStatus") PropertyRequest requestStatus,
                                                    @Param("search") String search,
                                                    @Param("sortColumn") String sortColumn,
                                                    @Param("sortDirection") String sortDirection,
                                                    Pageable pageable);
}



