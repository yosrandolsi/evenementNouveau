package com.event.eventManagment.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.event.eventManagment.Service.EventService;
import com.event.eventManagment.Service.UserService;  // Assurez-vous que UserService est importé
import com.event.eventManagment.model.Event;
import com.event.eventManagment.model.User;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    private final EventService eventService;
    private final UserService userService;  // Injection du UserService

    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;  // Initialisation du UserService
    }


    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        if (event.getTitle() == null || event.getCategory() == null || event.getDate() == null) {
            return ResponseEntity.badRequest().body("Titre, catégorie et date sont obligatoires.");
        }

        Event savedEvent = eventService.saveEvent(event);
        return ResponseEntity.ok(savedEvent);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Event>> getEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

  
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @RequestBody Event updatedEvent) {
        try {
            Event event = eventService.updateEvent(id, updatedEvent);
            return ResponseEntity.ok(event);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

  
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/category/{category}")
    public ResponseEntity<List<Event>> getEventsByCategory(@PathVariable String category) {
        List<Event> events = eventService.getEventsByCategory(category);
        return ResponseEntity.ok(events);
    }


    @GetMapping("/{eventId}/staff-suggestions")
    public ResponseEntity<List<User>> getSuggestedStaff(@PathVariable String eventId) {
        Event event = eventService.findById(eventId);
        if (event == null) {
            return ResponseEntity.notFound().build();  // Si l'événement n'est pas trouvé, retourne une réponse 404
        }

        List<User> suggestedStaff = new ArrayList<>();
        
       
        if (event.getRequiredTechniciens() > 0) {
            suggestedStaff = userService.getUsersByRole("Technicien");
        } else if (event.getRequiredAnimateurs() > 0) {
            suggestedStaff = userService.getUsersByRole("Animateur");
        } else if (event.getRequiredHotes() > 0) {
            suggestedStaff = userService.getUsersByRole("Hôte");
        }

        return ResponseEntity.ok(suggestedStaff);  // Retourner la liste des utilisateurs suggérés
    }
    @GetMapping("/count-by-categories")
    public ResponseEntity<Map<String, Long>> countEventsByCategories() {
        Map<String, Long> eventCountByCategory = eventService.countEventsByCategories();
        return ResponseEntity.ok(eventCountByCategory);
    }
}
