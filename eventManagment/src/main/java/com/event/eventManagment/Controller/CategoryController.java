package com.event.eventManagment.Controller;

import com.event.eventManagment.Service.CategoryService;
import com.event.eventManagment.model.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Endpoint pour récupérer toutes les catégories
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // Endpoint pour récupérer une catégorie par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id) {
        Category category = categoryService.getCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    // Endpoint pour créer une nouvelle catégorie
    @PostMapping("/create")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        // Déboguer le rôle de l'utilisateur actuel
        System.out.println("Rôle utilisateur actuel: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        Category savedCategory = categoryService.saveCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    // Endpoint pour supprimer une catégorie par son ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
