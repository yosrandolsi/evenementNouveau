package com.event.eventManagment.Repository;



import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import com.event.eventManagment.model.Category;

public interface CategoryRepository extends ElasticsearchRepository<Category, String> {
}
