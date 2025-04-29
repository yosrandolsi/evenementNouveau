package com.event.eventManagment.Controller;

import com.event.eventManagment.Service.UserService;
import com.event.eventManagment.model.Role;
import com.event.eventManagment.model.User;
import com.event.eventManagment.model.OperationalRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Lire tous les utilisateurs
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Lire un utilisateur par ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    // Créer un nouvel utilisateur
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Mettre à jour un utilisateur (tous les champs)
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    // Lire les membres du personnel disponibles par catégorie
    @GetMapping("/available-staff/{category}")
    public List<User> getAvailableStaffByCategory(@PathVariable String category) {
        return userService.getAvailableStaffByCategory(category);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateGlobalRole(@PathVariable String id, @RequestBody Map<String, String> roleMap) {
        String roleValue = roleMap.get("role");
        Role newRole = Role.valueOf(roleValue); // Convertit le string en enum
        User updatedUser = userService.updateGlobalRole(id, newRole);
        return ResponseEntity.ok(updatedUser);
    }


    @PutMapping("/{id}/operational-role")
    public ResponseEntity<User> updateOperationalRole(@PathVariable String id, @RequestBody Map<String, String> operationalRoleMap) {
        String roleValue = operationalRoleMap.get("operationalRole");
        OperationalRole newOperationalRole = OperationalRole.valueOf(roleValue); // Conversion string -> enum
        User updatedUser = userService.updateOperationalRole(id, newOperationalRole);
        return ResponseEntity.ok(updatedUser);
    }

}
