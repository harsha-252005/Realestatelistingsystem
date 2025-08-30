package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Property;
import com.examly.springapp.repository.PropertyRepository;
@Service
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
    public Property updateProperty(long id,Property propertyDetails){
       Property property=propertyRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("Property not found with id"+ id));
        property.setTitle(propertyDetails.getTitle());
        property.setDescription(propertyDetails.getDescription());
        property.setPrice(propertyDetails.getPrice());
        
        property.setBedrooms(propertyDetails.getBedrooms());
        property.setCity(propertyDetails.getCity());
        property.setZipCode(propertyDetails.getZipCode());
        return propertyRepository.save(property);
        
    }

    public void deleteProperty(Long id) {
        Property property=propertyRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("Property not found with id"+ id));
        propertyRepository.delete(property);
    }
    
}
