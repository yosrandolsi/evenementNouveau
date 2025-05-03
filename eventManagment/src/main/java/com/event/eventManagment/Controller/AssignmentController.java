package com.event.eventManagment.Controller;

import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.model.OperationalRole;
import com.event.eventManagment.Service.AssignmentService;
import com.event.eventManagment.Repository.AssignmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentController(AssignmentService assignmentService, AssignmentRepository assignmentRepository) {
        this.assignmentService = assignmentService;
        this.assignmentRepository = assignmentRepository;
    }

 // Endpoint pour assigner un rôle à un utilisateur dans un événement
    @PostMapping("/assign")
    public ResponseEntity<Assignment> assignStaffToEvent(@RequestBody Assignment assignment) {
        try {
            // Crée une nouvelle affectation et la sauvegarde dans la base de données
            Assignment savedAssignment = assignmentRepository.save(assignment);
            
            // Retourner l'affectation (qui contient l'ID de l'utilisateur) après l'enregistrement
            return new ResponseEntity<>(savedAssignment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    // Endpoint pour récupérer toutes les affectations
    @GetMapping
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        List<Assignment> assignments = assignmentService.getAllAssignments();
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }

    // Endpoint pour supprimer une affectation
    @DeleteMapping("/delete/{assignmentId}")
    public ResponseEntity<HttpStatus> deleteAssignment(@PathVariable String assignmentId) {
        try {
            assignmentService.deleteAssignment(assignmentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint pour obtenir les rôles affectés à un événement
    @GetMapping("/roles/{eventId}")
    public ResponseEntity<List<OperationalRole>> getAssignedRolesForEvent(@PathVariable String eventId) {
        List<OperationalRole> roles = assignmentService.getAssignedOperationalRoles(eventId);
        if (roles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    // Endpoint pour créer une affectation (en passant les paramètres en tant que requête)
    @PostMapping("/create")
    public ResponseEntity<Assignment> createAssignment(@RequestParam String userId,
                                                       @RequestParam String eventId,
                                                       @RequestParam OperationalRole operationalRole,
                                                       @RequestParam String skill) {
        try {
            // Crée une affectation via le service
            Assignment assignment = assignmentService.createAssignment(userId, eventId, operationalRole, skill);
            return new ResponseEntity<>(assignment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Assignment>> getAssignmentsByEvent(@PathVariable String eventId) {
        try {
            List<Assignment> assignments = assignmentService.getAssignmentsByEvent(eventId);
            return new ResponseEntity<>(assignments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/{assignmentId}")
    public ResponseEntity<Void> deleteAssignmentById(@PathVariable String assignmentId) {
        try {
            // Appeler le service pour supprimer l'affectation
            assignmentService.deleteAssignment(assignmentId);
            return ResponseEntity.noContent().build(); // Retourne 204 No Content
        } catch (RuntimeException e) {
            // Si l'affectation n'est pas trouvée, retourner un statut 404
            return ResponseEntity.notFound().build();
        }
    }
    
}
