package com.event.eventManagment.Service;

import com.event.eventManagment.Repository.AssignmentRepository;
import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    // Affecter un STAFF à un événement avec une compétence
    public Assignment assignStaffToEvent(String userId, String eventId, String skill) {
        Assignment assignment = new Assignment(userId, eventId, skill);
        return assignmentRepository.save(assignment);
    }

    public List<User> getAvailableStaffForSkill(String skill) {
        return assignmentRepository.findAvailableStaffForSkill(skill); // Assurez-vous que cette méthode retourne une liste de User
    }

    // Obtenir toutes les affectations pour un événement donné
    public Iterable<Assignment> getAssignmentsForEvent(String eventId) {
        return assignmentRepository.findByEventId(eventId); // Méthode à définir dans le repository
    }

    // Obtenir toutes les affectations pour un utilisateur donné
    public Iterable<Assignment> getAssignmentsForUser(String userId) {
        return assignmentRepository.findByUserId(userId); // Méthode à définir dans le repository
    }
}
