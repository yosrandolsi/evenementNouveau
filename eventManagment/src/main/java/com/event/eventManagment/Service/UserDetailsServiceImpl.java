package com.event.eventManagment.Service;

import com.event.eventManagment.Repository.UserRepository;
import com.event.eventManagment.model.User;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Si role est un enum Role
        String role = "ROLE_" + user.getRole().name();

        // Si role est une chaîne directement, fais juste :
        // String role = "ROLE_" + user.getRole();

        return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())
            .authorities(new SimpleGrantedAuthority(role))
            .build();
    }
}
