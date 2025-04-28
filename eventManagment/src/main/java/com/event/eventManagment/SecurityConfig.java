package com.event.eventManagment;

import com.event.eventManagment.jwt.JwtAuthenticationFilter;
import com.event.eventManagment.Service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService, JwtAuthenticationFilter jwtAuthFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/categories/all").permitAll()  // Autoriser tous les utilisateurs à accéder à la liste des catégories
                .requestMatchers("/api/categories/create").permitAll()   // Seul ADMIN peut créer des catégories
                .requestMatchers("/api/categories/delete/**").permitAll()  // Seul ADMIN peut supprimer des catégories
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // Accès restreint aux ressources ADMIN
                .requestMatchers("/api/organizer/**").hasAnyRole("ADMIN", "ORGANIZER")  // Les organisateurs et ADMIN peuvent accéder à ces ressources
                .requestMatchers("/api/user/**").hasAnyRole("ADMIN", "USER", "ORGANIZER")  // ADMIN, USER et ORGANIZER peuvent accéder à ces ressources
                .requestMatchers("/api/users/**").permitAll()  // Accès libre aux utilisateurs (par exemple pour la gestion des utilisateurs)
                .requestMatchers("/api/registrations/**").permitAll()

                
                // Protection des routes pour les événements
                .requestMatchers("/api/events/create").permitAll()  // Seul ADMIN ou ORGANIZER peuvent créer un événement
                .requestMatchers("/api/events/update/**").permitAll()  // Seul ADMIN ou ORGANIZER peuvent mettre à jour un événement
                .requestMatchers("/api/events/delete/**").permitAll()  // Seul ADMIN peut supprimer un événement
                .requestMatchers("/api/events/list").permitAll()  // Accès libre à la liste des événements
                .requestMatchers("/api/events/details/**").permitAll() 
                .requestMatchers("/api/events/category/**").permitAll()  // Accès libre aux événements par catégorie

                .anyRequest().authenticated()  // Toutes les autres requêtes nécessitent une authentification
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
