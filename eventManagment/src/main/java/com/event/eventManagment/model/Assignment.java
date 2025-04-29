package com.event.eventManagment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "assignments")
public class Assignment {
    @Id
    private String id;
    private String userId;    // ID de l'utilisateur (personnel)
    private String eventId;   // ID de l'événement
    private OperationalRole operationalRole;  // Le rôle attribué à l'utilisateur pour cet événement
    private String skill;     // Compétence utilisée pour cet événement (par exemple : "son", "lumière", etc.)

    // Constructeurs
    public Assignment(String userId, String eventId, OperationalRole operationalRole, String skill) {
        this.userId = userId;
        this.eventId = eventId;
        this.operationalRole = operationalRole;
        this.skill = skill;
    }

    // Getters et Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public OperationalRole getOperationalRole() {
        return operationalRole;
    }

    public void setOperationalRole(OperationalRole operationalRole) {
        this.operationalRole = operationalRole;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }
}
