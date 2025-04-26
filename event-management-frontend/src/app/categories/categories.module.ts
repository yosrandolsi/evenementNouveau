import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module'; // ✅ Chemin relatif corrigé

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';

@NgModule({
  declarations: [
  
    CategoryFormComponent,
    CategoryListComponent,
    CreateCategoryModalComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule {}
