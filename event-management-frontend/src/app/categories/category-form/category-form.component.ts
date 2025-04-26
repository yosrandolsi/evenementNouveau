import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  category: Category = { name: '' };

  constructor(private categoryService: CategoryService) {}

  submit(): void {
    this.categoryService.createCategory(this.category).subscribe(() => {
      alert('Catégorie ajoutée');
      this.category.name = '';
    });
  }
}
