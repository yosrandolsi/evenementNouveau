package com.event.eventManagment.Controller;

import com.event.eventManagment.Repository.UserRepository;
import com.event.eventManagment.jwt.JwtUtil;
import com.event.eventManagment.model.User;
import com.event.eventManagment.model.Role;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

 
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
    
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole(Role.PARTICIPANT); // Role par défaut
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);  // Retourner l'utilisateur enregistré
    }

   
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
     
        User found = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (!passwordEncoder.matches(user.getPassword(), found.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Générer le token JWT en incluant le nom d'utilisateur, le rôle et l'ID
        String token = jwtUtil.generateToken(found.getUsername(), found.getRole().name(), found.getId().toString());

        // Créer la réponse avec le token, le rôle et l'ID
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", found.getRole().name());  // Ajouter le rôle dans la réponse
        response.put("userId", found.getId().toString());  // Ajouter l'ID dans la réponse

        return ResponseEntity.ok(response);  // Retourner la réponse avec le token, le rôle et l'ID
    }
}
