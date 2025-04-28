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
  categoryName: string = ''; // Variable pour le nom de la catégorie

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'événement et de la catégorie depuis les paramètres de l'URL
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')!;

    // Récupérer le nom de la catégorie en fonction de son ID
    this.getCategoryName(this.categoryId);

    // Initialiser le formulaire de l'inscription
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      paymentStatus: ['En attente', Validators.required],
      notes: [''],
      categoryName: [this.categoryName, Validators.required],
      status: ['Actif', Validators.required], // Valeur par défaut
      preferences: [''],
      registrationDate: [new Date().toISOString(), Validators.required] // Ajouter la date actuelle
    });
  }

  // Méthode pour récupérer le nom de la catégorie en fonction de son ID
  getCategoryName(categoryId: string): void {
    // Ici, remplacez cette logique avec la méthode adéquate pour récupérer le nom
    if (categoryId === 'Informatique') {
      this.categoryName = 'Informatique';
    } else if (categoryId === 'Science') {
      this.categoryName = 'Science';
    } else {
      this.categoryName = 'Autre';
    }
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    // Récupérer l'ID de l'utilisateur depuis le localStorage
    const userId = localStorage.getItem('userId');

    // Vérifier que l'ID de l'utilisateur existe
    if (!userId) {
      console.error('Utilisateur non connecté');
      alert('Vous devez être connecté pour vous inscrire.');
      this.router.navigate(['/login']);
      return;
    }

    // Créer l'objet d'inscription avec l'ID de l'utilisateur et les autres champs
    const registrationData = {
      userId: userId,  // ID de l'utilisateur
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      address: this.registerForm.value.address,
      eventId: this.eventId,
      category: this.categoryName,  // Utiliser le nom de la catégorie
      status: this.registerForm.value.status,
      preferences: this.registerForm.value.preferences,
      registrationDate: this.registerForm.value.registrationDate  // Date actuelle
    };

    console.log('Envoi des données :', registrationData);

    this.registrationService.register(registrationData).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/events']); // Retour à la liste des événements après inscription
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription', error);
      }
    });
  }
}
