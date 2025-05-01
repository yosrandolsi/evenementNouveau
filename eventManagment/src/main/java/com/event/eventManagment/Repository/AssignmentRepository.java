package com.event.eventManagment.Repository;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.repository.CrudRepository;
import com.event.eventManagment.model.Assignment;
import com.event.eventManagment.model.OperationalRole;
import com.event.eventManagment.model.User;

import java.util.List;

public interface AssignmentRepository extends CrudRepository<Assignment, String> {

    boolean existsByUserIdAndEventIdAndOperationalRole(String userId, String eventId, OperationalRole operationalRole);

    // Méthode pour récupérer tous les assignments pour un événement donné
    Iterable<Assignment> findByEventId(String eventId);

    SearchHits<Assignment> searchByEventId(String eventId);

    List<Assignment> findByEventId(Long eventId);

    // Méthode personnalisée pour récupérer tous les rôles opérationnels uniques affectés à un événement
    @Query("{\"query\": {\"term\": {\"eventId\": \"?0\"}}}") // Assure-toi que cette requête est correcte pour ton cas d'utilisation
    List<OperationalRole> findDistinctOperationalRolesByEventId(String eventId);
}
