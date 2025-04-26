import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';  // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Enregistrer un utilisateur
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Connexion : ajusté pour envoyer "username" au lieu de "email"
  login(userData: any): Observable<any> {
    const loginData = {
      username: userData.username,  // Utiliser "username" au lieu de "email"
      password: userData.password
    };

    return this.http.post(`${this.apiUrl}/login`, loginData, { responseType: 'json' });
  }

  // Sauvegarder le token dans le localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtenir le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Supprimer le token lors de la déconnexion
  logout(): void {
    localStorage.removeItem('token');
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
