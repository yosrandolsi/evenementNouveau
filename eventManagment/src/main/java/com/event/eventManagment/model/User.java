package com.event.eventManagment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private Role role;  // <--- Ajout du champ rôle

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }  // Getter Role
    public void setRole(Role role) { this.role = role; }  // Setter Role
}
