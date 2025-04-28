package com.event.eventManagment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "registration")
public class Registration {
    @Id
    private String id;
    
    private String userId;    // ID de l'utilisateur
    
    // Informations personnelles à stocker (copiées au moment de l'inscription)
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    
    // Informations liées à l'événement
    private String eventId;
    private String category;
    private String status;           // En cours / Confirmé / Annulé
    private String preferences;      // Préférences particulières
    private String registrationDate; // Date d'inscription

    // Constructeurs
    public Registration() {}

    public Registration(String userId, String firstName, String lastName, String email, String phone, String address,
                        String eventId, String category, String status, String preferences, String registrationDate) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.eventId = eventId;
        this.category = category;
        this.status = status;
        this.preferences = preferences;
        this.registrationDate = registrationDate;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPreferences() { return preferences; }
    public void setPreferences(String preferences) { this.preferences = preferences; }

    public String getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(String registrationDate) { this.registrationDate = registrationDate; }
}
