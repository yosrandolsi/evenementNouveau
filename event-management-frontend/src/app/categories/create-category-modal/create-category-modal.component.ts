import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.css']
})
export class CreateCategoryModalComponent {
  categoryForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateCategoryModalComponent>,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  saveCategory(): void {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(() => {
        this.dialogRef.close(true); // fermeture + trigger refresh
      });
    }
  }

  close(): void {
    this.dialogRef.close(false); // fermeture simple
  }
}
