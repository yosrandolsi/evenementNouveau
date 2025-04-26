import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { name: '' };
  showForm: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newCategory = { name: '' }; // Reset champ si annulation
    }
  }

  createCategory(): void {
    if (this.newCategory.name.trim()) {
      this.categoryService.createCategory(this.newCategory).subscribe(() => {
        this.loadCategories();
        this.newCategory = { name: '' };
        this.showForm = false;
      });
    }
  }



  deleteCategory(id: string | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  viewEventsByCategory(name: string): void {
    window.location.href = `/events-by-category/${name}`;
  }
}
