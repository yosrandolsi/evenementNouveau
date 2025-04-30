package com.event.eventManagment.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.event.eventManagment.Service.EventService;
import com.event.eventManagment.model.Event;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // ✅ Création d'un événement avec validation
    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        if (event.getTitle() == null || event.getCategory() == null || event.getDate() == null) {
            return ResponseEntity.badRequest().body("Titre, catégorie et date sont obligatoires.");
        }

        Event savedEvent = eventService.saveEvent(event);
        return ResponseEntity.ok(savedEvent);
    }

    // ✅ Récupération de tous les événements
    @GetMapping("/list")
    public ResponseEntity<List<Event>> getEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    // ✅ Mise à jour d’un événement
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @RequestBody Event updatedEvent) {
        try {
            Event event = eventService.updateEvent(id, updatedEvent);
            return ResponseEntity.ok(event);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Récupération d’un événement par ID
    @GetMapping("/details/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Suppression d’un événement
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Récupération d’événements par catégorie
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Event>> getEventsByCategory(@PathVariable String category) {
        List<Event> events = eventService.getEventsByCategory(category);
        return ResponseEntity.ok(events);
    }
}
