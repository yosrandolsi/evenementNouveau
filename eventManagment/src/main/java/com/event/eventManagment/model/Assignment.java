package com.event.eventManagment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "assignments")
public class Assignment {
    @Id
    private String id;
    private String userId;    // ID du personnel
    private String eventId;   // ID de l'événement
    private String skill;     // Compétence utilisée pour cet événement
    public Assignment(String userId, String eventId, String skill) {
        this.userId = userId;
        this.eventId = eventId;
        this.skill = skill;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }
}
