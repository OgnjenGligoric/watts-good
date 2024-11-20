package com.example.WattsGood.service;

import com.example.WattsGood.model.HeartbeatMessage;
import com.example.WattsGood.model.Household;
import com.example.WattsGood.repository.IHouseholdRepository;
import com.example.WattsGood.service.interfaces.IHouseholdService;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HouseholdService implements IHouseholdService {

    @Autowired
    private IHouseholdRepository repository;

    @Override
    public List<Household> getAllHouseholds() {
        return repository.findAll();
    }
    @Override
    public List<Household> searchHouseholdsBy(String city, Integer squareMeters, Integer floorNumber){
        return repository.searchHouseholdsBy(city, squareMeters, floorNumber);
    }

    @Override
    public Household updateActivity(HeartbeatMessage message) {
        Household household = repository.getReferenceById(message.getHouseholdId());
        household.setActive(true);
        household.setLastHeartbeatTimestamp(message.getTimestamp());
        return repository.save(household);
    }

    @Override
    @Transactional // Ensures the query is part of a transactional context
    public void checkAndUpdateInactiveHouseholds(Long currentTime) {
        long threshold = currentTime - 30000; // 30 seconds
        repository.markHouseholdsAsInactive(threshold);
    }
}
