package com.event.eventManagment.Repository;


import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import com.event.eventManagment.model.Event;

@Repository
public interface EventRepository extends ElasticsearchRepository<Event, String> {
	List<Event> findByCategory(String category);
	long countByCategory(String category);
	
}
