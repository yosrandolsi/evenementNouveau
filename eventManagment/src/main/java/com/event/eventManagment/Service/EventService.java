package com.event.eventManagment.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

import com.event.eventManagment.Repository.EventRepository;
import com.event.eventManagment.Repository.CategoryRepository;
import com.event.eventManagment.Repository.UserRepository;
import com.event.eventManagment.model.Category;
import com.event.eventManagment.model.Event;
import com.event.eventManagment.model.OperationalRole;
import com.event.eventManagment.model.Role;
import com.event.eventManagment.model.User;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository; // Ajouter CategoryRepository

    public EventService(EventRepository eventRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository; // Initialiser CategoryRepository
    }


    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        eventRepository.findAll().forEach(events::add);
        return events;
    }

  
    public Event updateEvent(String id, Event updatedEvent) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            event.setTitle(updatedEvent.getTitle());
            event.setCategory(updatedEvent.getCategory());
            event.setDescription(updatedEvent.getDescription());
            event.setDate(updatedEvent.getDate());
            event.setLocation(updatedEvent.getLocation());
            event.setMaxParticipants(updatedEvent.getMaxParticipants());
            event.setRequiredAnimateurs(updatedEvent.getRequiredAnimateurs());
            event.setRequiredTechniciens(updatedEvent.getRequiredTechniciens());
            event.setRequiredHotes(updatedEvent.getRequiredHotes());
            return eventRepository.save(event);
        } else {
            throw new RuntimeException("Événement non trouvé avec l'ID : " + id);
        }
    }


    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }


    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }


    public List<Event> getEventsByCategory(String category) {
        return eventRepository.findByCategory(category);
    }

 
    public Event findById(String eventId) {
        Optional<Event> event = eventRepository.findById(eventId); // Elasticsearch retourne un Optional
        return event.orElse(null); // Retourne l'événement ou null si non trouvé
    }

  
    public List<User> suggestStaffForEvent(String eventId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));

        List<User> availableStaff = userRepository.findByRoleAndAvailable(Role.STAFF, true);
        List<User> suggestedStaff = new ArrayList<>();

        suggestedStaff.addAll(
            availableStaff.stream()
                .filter(u -> u.getOperationalRole() == OperationalRole.ANIMATEUR &&
                             u.getSkills().contains(event.getCategory()))
                .limit(event.getRequiredAnimateurs())
                .collect(Collectors.toList()));

        suggestedStaff.addAll(
            availableStaff.stream()
                .filter(u -> u.getOperationalRole() == OperationalRole.TECHNICIEN &&
                             u.getSkills().contains(event.getCategory()))
                .limit(event.getRequiredTechniciens())
                .collect(Collectors.toList()));

        suggestedStaff.addAll(
            availableStaff.stream()
                .filter(u -> u.getOperationalRole() == OperationalRole.HOTE &&
                             u.getSkills().contains(event.getCategory()))
                .limit(event.getRequiredHotes())
                .collect(Collectors.toList()));

        return suggestedStaff;
    }


    public long countEventsByCategory(String category) {
        return eventRepository.countByCategory(category);
    }


    public Map<String, Long> countEventsByCategories() {
        // Convertir l'Iterable<Category> en List<Category>
        Iterable<Category> categoriesIterable = categoryRepository.findAll();
        List<Category> categories = StreamSupport.stream(categoriesIterable.spliterator(), false)
                                                 .collect(Collectors.toList());
        
        // Créer une map pour stocker le comptage des événements par catégorie
        Map<String, Long> eventCountByCategory = new HashMap<>();
        
        // Pour chaque catégorie, compter les événements associés
        for (Category category : categories) {
            long count = eventRepository.countByCategory(category.getName());
            eventCountByCategory.put(category.getName(), count);
        }
        
        return eventCountByCategory;
    }
}
