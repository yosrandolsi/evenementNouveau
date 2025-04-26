package com.event.eventManagment.Service;

import com.event.eventManagment.Repository.UserRepository;
import com.event.eventManagment.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User register(User user) {
        // Encoder le mot de passe avant d'enregistrer
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Tu peux aussi ici forcer un rôle par défaut si besoin
        return userRepository.save(user);
    }

    public Optional<User> login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Comparer le mot de passe encodé
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}
