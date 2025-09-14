package com.examly.springapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
http
    .csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(auth -> auth
        // Swagger
        .requestMatchers(
            "/v3/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/swagger-resources/**",
            "/webjars/**"
        ).permitAll()

        // Properties API (adjust path if needed)
        .requestMatchers("/properties/**").permitAll()
        .requestMatchers("/api/properties/**").permitAll()

        // Allow everything for now (debugging)
        .anyRequest().permitAll()
    );


        return http.build();
    }
}
