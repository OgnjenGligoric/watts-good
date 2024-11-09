package com.example.wattsgood.wattsgood.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.wattsgood.wattsgood.models.Example;

@Repository
public interface ExampleRepository extends JpaRepository<Example, Long> {
    // You can add custom queries here if needed, for example:
    // List<ExampleModel> findByName(String name);
}