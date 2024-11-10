package com.example.WattsGood.repository;

import com.example.WattsGood.model.Household;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IHouseholdRepository extends JpaRepository<Household, Long> {
}
