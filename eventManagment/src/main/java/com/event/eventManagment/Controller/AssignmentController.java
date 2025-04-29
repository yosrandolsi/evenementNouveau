package com.event.eventManagment.Controller;

import com.event.eventManagment.Service.AssignmentService;
import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    // Affecter un STAFF à un événement avec une compétence
    @PostMapping("/assign")
    public Assignment assignStaffToEvent(@RequestParam String userId,
                                         @RequestParam String eventId,
                                         @RequestParam String skill) {
        return assignmentService.assignStaffToEvent(userId, eventId, skill);
    }

    // Obtenir tous les STAFFS disponibles pour une compétence donnée
    @GetMapping("/available-staff")
    public List<User> getAvailableStaffForSkill(@RequestParam String skill) {
        return assignmentService.getAvailableStaffForSkill(skill);
    }

    // Obtenir toutes les affectations pour un événement donné
    @GetMapping("/event/{eventId}")
    public Iterable<Assignment> getAssignmentsForEvent(@PathVariable String eventId) {
        return assignmentService.getAssignmentsForEvent(eventId);
    }

    // Obtenir toutes les affectations pour un utilisateur donné
    @GetMapping("/user/{userId}")
    public Iterable<Assignment> getAssignmentsForUser(@PathVariable String userId) {
        return assignmentService.getAssignmentsForUser(userId);
    }
}
