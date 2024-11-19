package com.example.WattsGood.service;

import com.example.WattsGood.model.Household;
import com.example.WattsGood.repository.IHouseholdRepository;
import com.example.WattsGood.service.interfaces.IHouseholdService;

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
    
}
