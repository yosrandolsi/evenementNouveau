package com.event.eventManagment.Repository;

import com.event.eventManagment.model.Role;
import com.event.eventManagment.model.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends ElasticsearchRepository<User, String> {

    List<User> findByRole(Role role);

    // Trouver les utilisateurs par rôle et disponibilité
    List<User> findByRoleAndAvailableTrue(Role role);

    // Trouver les utilisateurs ayant une compétence spécifique et disponibles
    List<User> findBySkillsContainingAndAvailableTrue(String skill);

    // Trouver un utilisateur par son nom d'utilisateur
    Optional<User> findByUsername(String username);
}
