package com.example.wattsgood.wattsgood.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wattsgood.wattsgood.models.Example;
import com.example.wattsgood.wattsgood.repositories.ExampleRepository;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/examples")
public class ExampleController {

    @Autowired
    private ExampleRepository exampleRepository;
    
    // Create a new ExampleModel
    @PostMapping
    public Example createExample(@RequestBody Example exampleModel) {
        return exampleRepository.save(exampleModel);
    }

    // Get all ExampleModels
    @GetMapping
    public List<Example> getAllExamples() {
        return exampleRepository.findAll();
    }

    // Get ExampleModel by ID
    @GetMapping("/{id}")
    public Optional<Example> getExampleById(@PathVariable Long id) {
        return exampleRepository.findById(id);
    }
    
}