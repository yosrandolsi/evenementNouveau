package com.event.eventManagment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Appliquer CORS à toutes les routes qui commencent par "/api/"
                .allowedOrigins("http://localhost:4200") // Frontend Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Méthodes autorisées
                .allowedHeaders("*") // Autoriser tous les en-têtes
                .allowCredentials(true); // Permettre l'envoi de cookies si nécessaire
    }
}
