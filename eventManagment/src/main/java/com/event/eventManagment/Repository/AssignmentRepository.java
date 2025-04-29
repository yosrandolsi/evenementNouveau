package com.event.eventManagment.Repository;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.repository.CrudRepository;

import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.model.User;

import java.util.List;

public interface AssignmentRepository extends CrudRepository<Assignment, String> {

 // Trouver tous les utilisateurs disponibles pour une compétence donnée
 @Query("SELECT u FROM User u JOIN Assignment a ON u.id = a.user.id WHERE a.skill = :skill")
 List<User> findAvailableStaffForSkill(String skill);

 // Trouver toutes les affectations pour un événement donné
 Iterable<Assignment> findByEventId(String eventId);

 // Trouver toutes les affectations pour un utilisateur donné
 Iterable<Assignment> findByUserId(String userId);
}
