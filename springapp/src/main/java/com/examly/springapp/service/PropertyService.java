package com.examly.springapp.service;

import java.time.LocalDate;
import java.time.LocalTime;
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
        if(property.getListingDate()==null){
            property.setListingDate(LocalDate.now());
        }
        return propertyRepository.save(property);
    }
    public List<Property> getAllProperties(){
        return propertyRepository.findAll();
    }
    public Optional<Property>getPropertyById(Long id){
        return propertyRepository.findById(id);
    }
    public List<Property> filterProperties(Double minprice, Double maxprice, Integer bedrooms, String city) {
        return propertyRepository.findAll().stream()
        .filter(p->(minprice==null||p.getPrice()>=minprice)&&
        (maxprice==null ||p.getPrice()<=maxprice)&&
        (bedrooms==null||p.getBedrooms()>=bedrooms)&&
        (city==null||p.getCity().equalsIgnoreCase(city)))
        .toList();
     }
    public Property updateProperty(long id,Property propertyDetails){
       Property property=propertyRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("Property not found with id"+ id));
        property.setTitle(propertyDetails.getTitle());
        property.setDescription(propertyDetails.getDescription());
        property.setPrice(propertyDetails.getPrice());
         property.setBedrooms(propertyDetails.getBedrooms());
         property.setBathrooms(propertyDetails.getBathrooms());
         property.setArea(propertyDetails.getArea());
         property.setAddress(propertyDetails.getAddress());
        property.setCity(propertyDetails.getCity());
        property.setState(propertyDetails.getState());
        property.setZipCode(propertyDetails.getZipCode());
        property.setPropertyType(propertyDetails.getPropertyType());
        property.setListingDate(propertyDetails.getListingDate()!=null ? propertyDetails.getListingDate():LocalDate.now());
        property.setIsAvailable(propertyDetails.isIsAvailable());
        return propertyRepository.save(property);
        
    }

    public void deleteProperty(Long id) {
        Property property=propertyRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("Property not found with id"+ id));
        propertyRepository.delete(property);
    }

  
    
}
