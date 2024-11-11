package com.example.WattsGood.service;

import com.example.WattsGood.model.City;
import com.example.WattsGood.repository.ICityRepository;
import com.example.WattsGood.service.interfaces.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    @Autowired
    private ICityRepository cityRepository;

    @Override
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
}
