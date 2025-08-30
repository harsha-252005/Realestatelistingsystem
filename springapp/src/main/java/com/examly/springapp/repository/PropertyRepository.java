package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.Property;

public interface PropertyRepository extends JpaRepository<Property,Long> {
    @Query("SELECT p from Property p " +
    "WHERE p.price BETWEEN :min AND :max " +
    "AND p.bedrooms=:bedrooms " +
     "AND p.city=:city ")
  List<Property> findByPriceCityAndBedrooms(@Param("min") double min,@Param("max") double max,@Param("bedrooms") int bedrooms,@Param("city") String city);
    
    

 
    
    
}
