package com.event.eventManagment.Service;

import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.model.OperationalRole;
import com.event.eventManagment.model.User;
import com.event.eventManagment.Repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private UserService userService; 

    public List<Assignment> getAllAssignments() {
        List<Assignment> assignments = new ArrayList<>();
        assignmentRepository.findAll().forEach(assignments::add);
        return assignments;
    }

    // Méthode pour récupérer toutes les affectations d'un événement
    public List<Assignment> getAssignmentsByEvent(String eventId) {
        // Utiliser Elasticsearch pour récupérer les affectations par événement
        SearchHits<Assignment> searchHits = assignmentRepository.searchByEventId(eventId);
        // Convertir les résultats en liste
        return searchHits.stream()
                         .map(hit -> hit.getContent())
                         .collect(Collectors.toList());
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
    public List<OperationalRole> getAssignedOperationalRoles(String eventId) {
        Iterable<Assignment> assignmentsIterable = assignmentRepository.findByEventId(eventId);
        List<Assignment> assignments = new ArrayList<>();
        assignmentsIterable.forEach(assignments::add); // Convertir Iterable en List
        return assignments.stream()
                          .map(Assignment::getOperationalRole)
                          .distinct()
                          .collect(Collectors.toList());
    }
    public Assignment createAssignment(String userId, String eventId, OperationalRole operationalRole, String skill) {
        // Récupérer l'utilisateur par son ID
        User user = userService.getUserById(userId);

        // Créer une nouvelle instance d'Assignment avec les informations nécessaires
        Assignment assignment = new Assignment(
            userId,     // Utilisateur
            eventId,    // ID de l'événement
            operationalRole,  // Rôle opérationnel
            skill       // Compétence
        );

        // Enregistrer l'affectation dans Elasticsearch
        return assignmentRepository.save(assignment);
    }

}
