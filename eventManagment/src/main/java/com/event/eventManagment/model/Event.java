package com.event.eventManagment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "events")
public class Event {

    @Id
    private String id;
    private String title;
    private String category;
    private String description;
    private String date; // Tu peux remplacer par LocalDate si tu veux un vrai format date
    private String location;
    private int maxParticipants;

    // Besoins en personnel opérationnel
    private int requiredAnimateurs;
    private int requiredTechniciens;
    private int requiredHotes;

    // Constructeur par défaut
    public Event() {}

    // Constructeur complet
    public Event(String title, String category, String description, String date, String location,
                 int maxParticipants, int requiredAnimateurs, int requiredTechniciens, int requiredHotes) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.date = date;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.requiredAnimateurs = requiredAnimateurs;
        this.requiredTechniciens = requiredTechniciens;
        this.requiredHotes = requiredHotes;
    }

    // Getters & Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public int getRequiredAnimateurs() {
        return requiredAnimateurs;
    }

    public void setRequiredAnimateurs(int requiredAnimateurs) {
        this.requiredAnimateurs = requiredAnimateurs;
    }

    public int getRequiredTechniciens() {
        return requiredTechniciens;
    }

    public void setRequiredTechniciens(int requiredTechniciens) {
        this.requiredTechniciens = requiredTechniciens;
    }

    public int getRequiredHotes() {
        return requiredHotes;
    }

    public void setRequiredHotes(int requiredHotes) {
        this.requiredHotes = requiredHotes;
    }
}
