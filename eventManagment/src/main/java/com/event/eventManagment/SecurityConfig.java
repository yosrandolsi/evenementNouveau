package com.event.eventManagment;

import com.event.eventManagment.jwt.JwtAuthenticationFilter;

import jakarta.servlet.http.HttpServletRequest;

import com.event.eventManagment.Service.UserDetailsServiceImpl;

import java.util.List;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;


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
    	http.sessionManagement( session -> 
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.csrf( csrf -> csrf.disable()) 
		
		.cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
            	  CorsConfiguration cors = new CorsConfiguration();
                  cors.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
                  cors.setAllowedMethods(Collections.singletonList("*"));
                  cors.setAllowCredentials(true);
                  cors.setAllowedHeaders(Collections.singletonList("*"));
                  cors.setExposedHeaders(Collections.singletonList("Authorization"));
                  cors.setMaxAge(3600L);
                return cors;
            }
        }))
		.authorizeHttpRequests( requests -> requests
            
                .requestMatchers("/api/auth/**").permitAll() // Authentification libre pour les endpoints auth
                .requestMatchers("/api/categories/all").permitAll() // Accès libre pour récupérer toutes les catégories
                .requestMatchers(new AntPathRequestMatcher("/api/categories/**", "OPTIONS")).permitAll() // Autoriser les OPTIONS pour certaines routes
                .requestMatchers("/api/categories/create").hasRole("ADMIN") // Seul l'ADMIN peut créer des catégories
                .requestMatchers("/api/categories/delete/**").hasRole("ADMIN")  // Seul l'ADMIN peut supprimer des catégories
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // Accès limité aux ADMIN
                .requestMatchers("/api/organizer/**").hasAnyRole("ADMIN", "ORGANIZER")  // Accès limité aux ORGANIZER et ADMIN
                /*.requestMatchers("/api/user/**").permitAll()  // Accès pour ADMIN, USER et ORGANIZER*/
               /*.requestMatchers("/api/users/**").permitAll()  // Accès libre pour l'affichage des utilisateurs*/
                
                .requestMatchers("/api/registrations/**").hasAnyRole("ADMIN", "ORGANIZER")  // Accès libre aux inscriptions
                .requestMatchers("/api/events/list").permitAll()
                .requestMatchers("/api/events/details/**").permitAll()
                .requestMatchers("/api/events/category/**").permitAll()
                .requestMatchers("/api/events/count-by-categories").permitAll()
                .requestMatchers("/api/events/create").hasAnyRole("ADMIN", "ORGANIZER")
                .requestMatchers("/api/events/update/**").hasAnyRole("ADMIN", "ORGANIZER")
                .requestMatchers("/api/events/delete/**").hasRole("ADMIN")
                /*.requestMatchers("/api/events/**").hasAnyRole("ADMIN", "ORGANIZER") // Pour couvrir les autres cas comme /{id}/staff-suggestions*/
                
                
                .requestMatchers(new AntPathRequestMatcher("/api/users/**", "OPTIONS")).permitAll()
             // Nouveaux endpoints du UserController
                .requestMatchers("/api/users/available-staff/**").permitAll()
                .requestMatchers("/api/users/**").permitAll()
                .requestMatchers("/api/users/by-operational-role").permitAll()
                .requestMatchers("/api/users/countByRole").permitAll()

                
                
                
             // 🔐 Endpoints du ParticipantController
                .requestMatchers("/api/participants/register").permitAll()
                .requestMatchers("/api/participants/event/**").permitAll()
                .requestMatchers("/api/participants/all").permitAll()

                .requestMatchers(new AntPathRequestMatcher("/api/events/**", "OPTIONS")).permitAll()
             // 🔐 Endpoints du EventController
                .requestMatchers("/api/events/create").permitAll()
                .requestMatchers("/api/events/list").permitAll()
                .requestMatchers("/api/events/update/**").permitAll()
                .requestMatchers("/api/events/details/**").permitAll()
                .requestMatchers("/api/events/delete/**").permitAll()
                .requestMatchers("/api/events/category/**").permitAll()
                .requestMatchers("/api/events/**").permitAll()
                .requestMatchers("/api/events/count-by-categories").permitAll()
  
                
                
                
                
                
               /* .requestMatchers("/assignments/**").permitAll()*/
                
             // 🔐 Endpoints du AssignmentController
                .requestMatchers("/assignments/assign").permitAll()
                .requestMatchers("/assignments").permitAll()
                .requestMatchers("/assignments/delete/**").permitAll()
                .requestMatchers("/assignments/roles/**").permitAll()
                .requestMatchers("/assignments/create").permitAll()
                .requestMatchers("/assignments/event/**").permitAll()

                .anyRequest().authenticated() )
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
