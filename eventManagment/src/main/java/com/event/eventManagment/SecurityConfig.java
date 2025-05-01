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
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationFilter jwtAuthFilter;

    // Injection des dépendances via le constructeur
    public SecurityConfig(UserDetailsServiceImpl userDetailsService, JwtAuthenticationFilter jwtAuthFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.disable())  // Désactiver CORS, selon ta configuration spécifique
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Authentification libre pour les endpoints auth
                .requestMatchers("/api/categories/all").permitAll() // Accès libre pour récupérer toutes les catégories
                .requestMatchers(new AntPathRequestMatcher("/api/categories/**", "OPTIONS")).permitAll() // Autoriser les OPTIONS pour certaines routes
                .requestMatchers("/api/categories/create").hasRole("ADMIN") // Seul l'ADMIN peut créer des catégories
                .requestMatchers("/api/categories/delete/**").permitAll()  // Seul l'ADMIN peut supprimer des catégories
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // Accès limité aux ADMIN
                .requestMatchers("/api/organizer/**").hasAnyRole("ADMIN", "ORGANIZER")  // Accès limité aux ORGANIZER et ADMIN
                .requestMatchers("/api/user/**").permitAll()  // Accès pour ADMIN, USER et ORGANIZER
                .requestMatchers("/api/users/**").permitAll()  // Accès libre pour l'affichage des utilisateurs
                .requestMatchers("/api/registrations/**").permitAll() // Accès libre aux inscriptions
                .requestMatchers("/api/events/**").permitAll()  // Accès libre aux événements
                .requestMatchers("/api/events/create").hasAnyRole("ADMIN", "ORGANIZER") // Créer un événement
                .requestMatchers("/api/events/update/**").hasAnyRole("ADMIN", "ORGANIZER")  // Mettre à jour un événement
                .requestMatchers("/api/events/delete/**").hasRole("ADMIN")  // Supprimer un événement
                .requestMatchers("/api/events/list").permitAll()  // Accès libre à la liste des événements
                .requestMatchers("/api/events/details/**").permitAll()  // Accès libre aux détails d'un événement
                .requestMatchers("/api/events/category/**").permitAll()  // Accès libre aux événements par catégorie
                .requestMatchers("/assignments/**").permitAll()
                .anyRequest().authenticated()  // Toutes les autres requêtes nécessitent une authentification
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Ajouter le filtre JWT avant l'authentification classique

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager(); // Créer un manager d'authentification pour Spring Security
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Encoder le mot de passe avec bcrypt
    }
}
