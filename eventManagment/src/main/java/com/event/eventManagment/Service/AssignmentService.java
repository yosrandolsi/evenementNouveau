package com.event.eventManagment.Service;

import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.model.OperationalRole;
import com.event.eventManagment.Repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    // Méthode pour assigner un utilisateur à un événement avec un rôle spécifique
    public Assignment assignStaffToEvent(String userId, String eventId, OperationalRole operationalRole, String skill) {
        // Créer une nouvelle affectation
        Assignment assignment = new Assignment(userId, eventId, operationalRole, skill);
        // Sauvegarder l'affectation dans la base de données
        return assignmentRepository.save(assignment);
    }

    // Méthode pour récupérer toutes les affectations d'un événement
    public Iterable<Assignment> getAssignmentsByEvent(String eventId) {
        return assignmentRepository.findByEventId(eventId);
    }

    // Méthode pour récupérer une affectation spécifique
    public Assignment getAssignmentById(String assignmentId) {
        return assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Affectation non trouvée avec l'ID : " + assignmentId));
    }

    // Méthode pour supprimer une affectation
    public void deleteAssignment(String assignmentId) {
        assignmentRepository.deleteById(assignmentId);
    }
}
