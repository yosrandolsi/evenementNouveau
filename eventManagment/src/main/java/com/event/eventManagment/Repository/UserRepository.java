package com.event.eventManagment.Repository;

import java.util.Optional;
import com.event.eventManagment.model.User; 

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

	

public interface UserRepository extends ElasticsearchRepository<User, String>  {
	    Optional<User> findByUsername(String username);
	    
	
}
