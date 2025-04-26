import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],  // 👈 changé de "email" à "username"
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.isLoading = true;
    const { username, password } = this.loginForm.value;
  
    console.log('Données envoyées pour la connexion:', { username, password });
  
    this.authService.login({ username, password }).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Réponse de l\'API (connexion réussie) :', response);
  
        // Sauvegarde du token reçu dans le localStorage
        this.authService.saveToken(response.token);  // réponse.token au lieu de juste `token`
  
        // Redirection vers la page d'accueil après la connexion réussie
        this.router.navigate(['/events']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Erreur lors de la connexion :', error);
        this.errorMessage = 'Erreur lors de la connexion. Vérifiez vos identifiants.';
      }
    );
  }
}  