package com.event.eventManagment.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.event.eventManagment.Repository.CategoryRepository;
import com.event.eventManagment.model.Category;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Créer ou mettre à jour une catégorie
    @Transactional
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Récupérer toutes les catégories
    public List<Category> getAllCategories() {
        // Conversion explicite de l'Iterable en une List
        List<Category> categories = new ArrayList<>();
        categoryRepository.findAll().forEach(categories::add);
        return categories;
    }

    // Récupérer une catégorie par son ID
    public Category getCategoryById(String id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElseThrow(() -> new RuntimeException("Category not found"));
    }

    // Supprimer une catégorie
    @Transactional
    public void deleteCategory(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }
        categoryRepository.deleteById(id);
    }
}
