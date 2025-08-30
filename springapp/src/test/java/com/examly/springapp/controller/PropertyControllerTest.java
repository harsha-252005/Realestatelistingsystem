package com.examly.springapp.controller;

import com.examly.springapp.model.Property;
import com.examly.springapp.repository.PropertyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class PropertyControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private PropertyRepository propertyRepository;

    @BeforeEach
    public void setup() {
        propertyRepository.deleteAll();
    }

    private Property validProperty() {
        Property p = new Property();
        p.setTitle("Modern Condo");
        p.setDescription("Spacious and bright updated unit");
        p.setPrice(320000.0);
        p.setBedrooms(3);
        p.setBathrooms(2.0);
        p.setArea(1245.0);
        p.setAddress("555 Center Blvd");
        p.setCity("New York");
        p.setState("NY");
        p.setZipCode("10001");
        p.setPropertyType("Condo");
        p.setIsAvailable(true);
        return p;
    }

    @Test
    public void createPropertyTest_success() throws Exception {
        Property prop = validProperty();
        mockMvc.perform(post("/api/properties")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(prop)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.title").value("Modern Condo"))
                .andExpect(jsonPath("$.city").value("New York"));
    }

    @Test
    public void createPropertyTest_validationErrors() throws Exception {
        Property prop = validProperty();
        prop.setTitle("");
        prop.setPrice(-50.0);
        prop.setZipCode("xyz");
        mockMvc.perform(post("/api/properties")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(prop)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").exists())
                .andExpect(jsonPath("$.price").exists())
                .andExpect(jsonPath("$.zipCode").exists())
                .andExpect(jsonPath("$.message").value("Validation failed"));
    }

    @Test
    public void getPropertiesTest_emptyList() throws Exception {
        mockMvc.perform(get("/api/properties")).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void getPropertiesTest_success() throws Exception {
        Property prop1 = validProperty();
        Property prop2 = validProperty();
        prop2.setTitle("Urban Loft"); prop2.setCity("Chicago");
        propertyRepository.save(prop1); propertyRepository.save(prop2);

        mockMvc.perform(get("/api/properties"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title", anyOf(is("Modern Condo"), is("Urban Loft"))))
                .andExpect(jsonPath("$[1].city", anyOf(is("New York"), is("Chicago"))));
    }

    @Test
    public void getPropertyByIdTest_success() throws Exception {
        Property prop = validProperty();
        Property saved = propertyRepository.save(prop);
        mockMvc.perform(get("/api/properties/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Modern Condo"));
    }

    @Test
    public void getPropertyByIdTest_notFound() throws Exception {
        mockMvc.perform(get("/api/properties/88888"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Property not found."));
    }

    @Test
    public void filterPropertiesTest_priceBedroomsCity() throws Exception {
        Property propA = validProperty();
        Property propB = validProperty();
        propB.setTitle("Suburban Villa");propB.setPrice(500000.0); propB.setBedrooms(4); propB.setCity("Boston");
        propertyRepository.save(propA); propertyRepository.save(propB);

        mockMvc.perform(get("/api/properties/filter?minPrice=200000&maxPrice=400000&bedrooms=2&city=New York"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].city").value("New York"));

        mockMvc.perform(get("/api/properties/filter?minPrice=1000000"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void filterPropertiesTest_partial() throws Exception {
        Property propA = validProperty();
        propA.setCity("Las Vegas");
        propA.setPrice(250000.0);
        propertyRepository.save(propA);
        mockMvc.perform(get("/api/properties/filter?city=Las Vegas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].city").value("Las Vegas"));
    }
}
