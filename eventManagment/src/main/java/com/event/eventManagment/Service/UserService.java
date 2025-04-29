
package com.event.eventManagment.Service;


import com.event.eventManagment.Repository.UserRepository;
import com.event.eventManagment.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        Iterable<User> iterable = userRepository.findAll();
        return StreamSupport.stream(iterable.spliterator(), false)
                             .collect(Collectors.toList());
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(String id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));

        // Mise à jour des informations de l'utilisateur
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());

        // Si un mot de passe est fourni, on le met à jour (si non, il reste inchangé)
        if (userDetails.getPassword() != null) {
            user.setPassword(userDetails.getPassword());
        }

        user.setRole(userDetails.getRole());
        user.setAvailable(userDetails.isAvailable());
        user.setSkills(userDetails.getSkills());

        // Sauvegarder l'utilisateur mis à jour dans la base de données
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
