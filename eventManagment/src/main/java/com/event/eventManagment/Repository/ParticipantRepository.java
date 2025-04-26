package com.event.eventManagment.Repository;

import java.util.List;
import com.event.eventManagment.model.Participant; 

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ParticipantRepository extends ElasticsearchRepository <Participant, String> {
	 List<Participant> findByEventId(String eventId);
	
}
