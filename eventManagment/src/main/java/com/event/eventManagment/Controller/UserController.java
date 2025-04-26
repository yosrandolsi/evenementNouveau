package com.event.eventManagment.Controller;



import com.event.eventManagment.Repository.UserRepository;
import com.event.eventManagment.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Endpoint pour récupérer tous les utilisateurs
    @GetMapping
    public List<User> getAllUsers() {
        Iterable<User> iterable = userRepository.findAll();
        return StreamSupport.stream(iterable.spliterator(), false)
                             .collect(Collectors.toList());
    }
}

