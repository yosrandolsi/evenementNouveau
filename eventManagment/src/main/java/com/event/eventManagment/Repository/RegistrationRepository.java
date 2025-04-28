package com.event.eventManagment.Repository;

import com.event.eventManagment.model.Registration;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends ElasticsearchRepository<Registration, String> {
    List<Registration> findByEventId(String eventId);
}
