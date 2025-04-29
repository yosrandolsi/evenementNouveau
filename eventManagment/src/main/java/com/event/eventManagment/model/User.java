package com.event.eventManagment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Document(indexName = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private Role role; // Rôle principal
    private OperationalRole operationalRole; // Rôle organisationnel
    private boolean available;
    private List<String> skills; // Liste des compétences de l'utilisateur

    // Constructeurs, getters et setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public OperationalRole getOperationalRole() {
        return operationalRole;
    }

    public void setOperationalRole(OperationalRole operationalRole) {
        this.operationalRole = operationalRole;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
