package com.event.eventManagment.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import com.event.eventManagment.Repository.EventRepository;
import com.event.eventManagment.model.Event;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        eventRepository.findAll().forEach(events::add); // safe way to avoid null issues
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


}
