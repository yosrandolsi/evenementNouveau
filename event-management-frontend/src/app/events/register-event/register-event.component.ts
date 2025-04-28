import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.css']
})
export class RegisterEventComponent implements OnInit {
  registerForm!: FormGroup;
  eventId!: string;
  categoryId!: string;
  categoryName: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')!;
    this.getCategoryName(this.categoryId);

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      paymentStatus: ['En attente', Validators.required],
      notes: [''],
      categoryName: [this.categoryName, Validators.required],
      preferences: [''],
      registrationDate: [new Date().toISOString().split('T')[0], Validators.required],
      isActive: [false]
    });
  }

  getCategoryName(categoryId: string): void {
    if (categoryId === 'Informatique') {
      this.categoryName = 'Informatique';
    } else if (categoryId === 'Science') {
      this.categoryName = 'Science';
    } else {
      this.categoryName = 'Autre';
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Utilisateur non connecté');
      alert('Vous devez être connecté pour vous inscrire.');
      this.router.navigate(['/login']);
      return;
    }

    const registrationData = {
      userId: userId,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      address: this.registerForm.value.address,
      eventId: this.eventId,
      category: this.categoryName,
      status: 'En cours',
      preferences: this.registerForm.value.preferences,
      registrationDate: this.registerForm.value.registrationDate,
      isActive: this.registerForm.value.isActive
    };

    this.registrationService.register(registrationData).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/events']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription', error);
      }
    });
  }
}
