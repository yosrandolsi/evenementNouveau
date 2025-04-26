import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';  // Assurez-vous d'ajuster le chemin d'importation
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Vérification de la correspondance entre les mots de passe
  get passwordsMatch() {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }

  onSubmit(): void {
    if (this.registerForm.invalid || !this.passwordsMatch) {
      return;
    }

    this.isLoading = true;
    const { username, email, password } = this.registerForm.value;

    // Log les données dans la console avant d'envoyer la requête
    console.log('Données envoyées pour l\'inscription:', { username, email, password });

    this.authService.register({ username, email, password }).subscribe(
      (response) => {
        this.isLoading = false;
        // Affiche la réponse du serveur dans la console
        console.log('Réponse de l\'API (inscription réussie) :', response);
        
        // Redirection vers la page de connexion après l'inscription réussie
        this.router.navigate(['/login']);
      },
      (error) => {
        this.isLoading = false;
        // Affiche l'erreur dans la console
        console.error('Erreur lors de l\'inscription :', error);
        
        this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
      }
    );
  }
}
