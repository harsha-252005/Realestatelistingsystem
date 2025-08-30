package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
            return new ResponseEntity<>("Validation failed: "+e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping
    public ResponseEntity<List<Property>>getAllProperty(){
        List<Property>properties=propertyService.getAllProperties();
        return new ResponseEntity<>(properties,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?>getPropertyByid(@PathVariable long id){
       Optional<Property>property=propertyService.getPropertyById(id);
        if(property.isPresent()){
            return new ResponseEntity<>(property.get(),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Property not found",HttpStatus.NOT_FOUND);

        }   
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Property>>filterProperty(@RequestParam double minprice,@RequestParam double maxprice,@RequestParam int bedrooms,@RequestParam String city){
        List<Property>filteredproperties=propertyService.getPropertiesByRangeCityandBedrooms(minprice, maxprice, bedrooms, city);
        return new ResponseEntity<>(filteredproperties,HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?>updateProperties(@PathVariable Long id,@Valid @RequestBody Property property ){
        try {
         Property updateProperty=propertyService.updateProperty(id,property);
         return new ResponseEntity<>(updateProperty,HttpStatus.OK);
        } catch (Exception e) {
        return new ResponseEntity<>("Property not found",HttpStatus.NOT_FOUND);

        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>deleteProperty(@PathVariable Long id ){
        try {
         propertyService.deleteProperty(id);
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
        return new ResponseEntity<>("Property not found",HttpStatus.NOT_FOUND);

        }
    }
    

}
