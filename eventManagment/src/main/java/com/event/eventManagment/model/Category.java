package com.event.eventManagment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "categories")
public class Category {
    @Id
    private String id;
    private String name;

    // Constructeurs, getters et setters
    public Category() {}

    public Category(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
