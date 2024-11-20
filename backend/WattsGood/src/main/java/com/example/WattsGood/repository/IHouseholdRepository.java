package com.example.WattsGood.repository;

import com.example.WattsGood.model.Household;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IHouseholdRepository extends JpaRepository<Household, Long> {
    @Query("SELECT h FROM Household h JOIN h.property p JOIN p.city c " +
       "WHERE (c.name LIKE %?1% OR ?1 IS NULL) " +
       "AND (h.squareMeters >= ?2 OR ?2 IS NULL) " +
       "AND (h.floorNumber >= ?3 OR ?3 IS NULL)")
    List<Household> searchHouseholdsBy(String city, Integer minSquareMeters, Integer minFloorNumber);

    @Modifying
    @Query("UPDATE Household h SET h.isActive = false WHERE h.lastHeartbeatTimestamp < :threshold AND h.isActive = true")
    int markHouseholdsAsInactive(@Param("threshold") Long threshold);
}
