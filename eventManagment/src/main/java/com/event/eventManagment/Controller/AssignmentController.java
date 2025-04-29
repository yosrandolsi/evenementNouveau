package com.event.eventManagment.Controller;

import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.Repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    // Endpoint pour assigner un rôle à un utilisateur dans un événement
    @PostMapping("/assign")
    public Assignment assignStaffToEvent(@RequestBody Assignment assignment) {
        // Crée une nouvelle affectation et la sauvegarde dans la base de données
        return assignmentRepository.save(assignment);
    }
}
