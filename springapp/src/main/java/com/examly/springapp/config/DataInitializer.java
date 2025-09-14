package com.examly.springapp.config;

import com.examly.springapp.model.Property;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.PropertyRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    public DataInitializer(PropertyRepository propertyRepository, UserRepository userRepository) {
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create test users
        if (userRepository.count() == 0) {
            // Admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@realestate.com");
            admin.setPassword("admin123");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);

            // Regular user
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@realestate.com");
            user.setPassword("user123");
            user.setRole(User.Role.USER);
            userRepository.save(user);

            System.out.println("Test users created!");
        }

        if (propertyRepository.count() == 0) {
            // Create sample properties
            Property property1 = new Property();
            property1.setTitle("Modern Apartment");
            property1.setDescription("Beautiful modern apartment in downtown");
            property1.setPrice(250000.0);
            property1.setBedrooms(2);
            property1.setBathrooms(2.0);
            property1.setArea(1200.0);
            property1.setAddress("123 Main St");
            property1.setCity("New York");
            property1.setState("NY");
            property1.setZipCode("10001");
            property1.setPropertyType("Apartment");
            property1.setListingDate(LocalDate.now());
            property1.setAvailable(true);

            Property property2 = new Property();
            property2.setTitle("Cozy House");
            property2.setDescription("Charming house with garden");
            property2.setPrice(350000.0);
            property2.setBedrooms(3);
            property2.setBathrooms(2.5);
            property2.setArea(1800.0);
            property2.setAddress("456 Oak Ave");
            property2.setCity("Los Angeles");
            property2.setState("CA");
            property2.setZipCode("90210");
            property2.setPropertyType("House");
            property2.setListingDate(LocalDate.now());
            property2.setAvailable(true);

            Property property3 = new Property();
            property3.setTitle("Luxury Condo");
            property3.setDescription("High-end condo with city views");
            property3.setPrice(500000.0);
            property3.setBedrooms(3);
            property3.setBathrooms(3.0);
            property3.setArea(2000.0);
            property3.setAddress("789 Park Blvd");
            property3.setCity("Chicago");
            property3.setState("IL");
            property3.setZipCode("60601");
            property3.setPropertyType("Condo");
            property3.setListingDate(LocalDate.now());
            property3.setAvailable(false);

            propertyRepository.save(property1);
            propertyRepository.save(property2);
            propertyRepository.save(property3);

            System.out.println("Sample data initialized!");
        }
    }
}