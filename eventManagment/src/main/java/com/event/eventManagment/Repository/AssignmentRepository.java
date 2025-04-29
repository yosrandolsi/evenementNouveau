package com.event.eventManagment.Repository;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.repository.CrudRepository;

import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.model.User;

import java.util.List;

public interface AssignmentRepository extends CrudRepository<Assignment, String> {

 // Trouver tous les utilisateurs disponibles pour une compétence donnée
    Iterable<Assignment> findByEventId(String eventId);
}
