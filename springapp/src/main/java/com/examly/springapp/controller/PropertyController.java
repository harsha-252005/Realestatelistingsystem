package com.examly.springapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.Poimport
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;ng;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Property;
import com.examly.springapp.service.PropertyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/properties")
@Validated

public class PropertyController {
    private final PropertyService propertyService;
    public PropertyController(PropertyService propertyService){
        this.propertyService=propertyService;
    }
    @PostMapping
    public ResponseEntity<?>createProperty (@Valid @RequestBody Property property){
        try {
            Property createdProperty=propertyService.addProperty(property);
            return new ResponseEntity<>(createdProperty,HttpStatus.CREATED);
            
        } catch (Exception e) {
            return new ResponseEntity<>("Validation failed: + e.get")
        }
    }


}
