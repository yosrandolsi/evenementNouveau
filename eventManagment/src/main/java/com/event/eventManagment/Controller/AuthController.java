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

    // Méthode pour l'inscription
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        // Encoder le mot de passe de l'utilisateur
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Si le rôle est nul, on affecte un rôle par défaut
        if (user.getRole() == null) {
            user.setRole(Role.PARTICIPANT); // Role par défaut
        }

        // Enregistrer l'utilisateur dans la base de données
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);  // Retourner l'utilisateur enregistré
    }

    // Méthode pour la connexion
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        // Rechercher l'utilisateur par son nom d'utilisateur
        User found = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier si les mots de passe correspondent
        if (!passwordEncoder.matches(user.getPassword(), found.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Générer le token JWT en incluant le nom d'utilisateur et le rôle
        String token = jwtUtil.generateToken(found.getUsername(), found.getRole().name());

        // Créer la réponse avec le token et les rôles
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", found.getRole().name());  // Ajouter le rôle dans la réponse

        return ResponseEntity.ok(response);  // Retourner la réponse avec le token et le rôle
    }
}