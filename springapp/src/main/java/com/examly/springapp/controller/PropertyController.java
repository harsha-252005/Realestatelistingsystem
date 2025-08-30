package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
       
            Property createdProperty=propertyService.addProperty(property);
            return new ResponseEntity<>(createdProperty,HttpStatus.CREATED);
        
        
    }
    @GetMapping
    public ResponseEntity<List<Property>>getAllProperty(){
        List<Property>properties=propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?>getPropertyById(@PathVariable Long id){
       Optional<Property>property=propertyService.getPropertyById(id);
        if(property.isPresent()){
            return ResponseEntity.ok(property.get());
        }
        Map<String,String>error=new HashMap<>();
        error.put("message", "Property not found.");
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Property>>filterProperty(
    @RequestParam(required = false,name="minPrice") Double minPrice,
    @RequestParam (required = false,name="maxPrice") Double maxPrice,
    @RequestParam (required = false) Integer bedrooms,
    @RequestParam (required = false) String city){
        List<Property>filteredproperties=propertyService.filterProperties(minPrice,maxPrice,bedrooms,city);
        return ResponseEntity.ok(filteredproperties);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?>updateProperties(@PathVariable Long id,@Valid @RequestBody Property property ){
        try {
         Property updateProperty=propertyService.updateProperty(id,property);
         return ResponseEntity.ok(updateProperty);
        } catch (Exception e) {
       Map<String,String>error=new HashMap<>();
       error.put("message", "Property not found");
       return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);


        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>deleteProperty(@PathVariable Long id ){
        try {
         propertyService.deleteProperty(id);
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
         Map<String,String>error=new HashMap<>();
         error.put("message", "Property not found");
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);

        }
    }
    

}
