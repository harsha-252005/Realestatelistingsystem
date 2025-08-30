package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Property;
import com.examly.springapp.repository.PropertyRepository;

public class PropertyService {
    private final PropertyRepository propertyRepository;
    
    public PropertyService(PropertyRepository propertyRepository){
        this.propertyRepository=propertyRepository;
    }

    public Property addProperty(Property property){
        return propertyRepository.save(property);
    }
    public List<Property> getAllProperties(){
        return propertyRepository.findAll();
    }
    public Optional<Property>getPropertyById(Long id){
        return propertyRepository.findById(id);
    }
    public List<Property>getPropertiesByRangeCityandBedrooms(double min,double max,int bedrooms,String city){
        return propertyRepository.findByPriceCityAndBedrooms(min,max,bedrooms,city);
    }
}
