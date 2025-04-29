package com.event.eventManagment.Service;

import com.event.eventManagment.Repository.UserRepository;
import com.event.eventManagment.model.Role;
import com.event.eventManagment.model.User;
import com.event.eventManagment.model.OperationalRole;
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

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());

        if (userDetails.getPassword() != null) {
            user.setPassword(userDetails.getPassword());
        }

        user.setRole(userDetails.getRole());
        user.setAvailable(userDetails.isAvailable());
        user.setSkills(userDetails.getSkills());

        // Mise à jour du rôle opérationnel
        user.setOperationalRole(userDetails.getOperationalRole());

        return userRepository.save(user);
    }

    public List<User> getAvailableStaffByCategory(String category) {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
            .filter(user -> user.getRole() == Role.STAFF)
            .filter(User::isAvailable)
            .filter(user -> user.getSkills() != null && user.getSkills().contains(category))
            .collect(Collectors.toList());
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    // Mise à jour du rôle principal (Role)
    public User updateGlobalRole(String userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + userId));
        
        user.setRole(newRole);  // Mise à jour du rôle principal
        return userRepository.save(user); // Sauvegarde de l'utilisateur avec son nouveau rôle
    }

    // Mise à jour du rôle opérationnel (OperationalRole)
    public User updateOperationalRole(String userId, OperationalRole newOperationalRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + userId));
        
        user.setOperationalRole(newOperationalRole);  // Mise à jour du rôle opérationnel
        return userRepository.save(user); // Sauvegarde de l'utilisateur avec son nouveau rôle opérationnel
    }
 // Service pour mettre à jour les compétences d'un utilisateur
    public User updateSkills(String userId, List<String> newSkills) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + userId));
        
        // Mettre à jour les compétences de l'utilisateur
        user.setSkills(newSkills);
        
        // Sauvegarder l'utilisateur après la mise à jour des compétences
        return userRepository.save(user);
    }

}
