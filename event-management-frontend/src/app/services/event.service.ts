import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8080/api/events'; // L'URL de votre backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Récupérer tous les événements
  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Créer un nouvel événement
  createEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, event, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Mettre à jour un événement existant (nouvelle version)
  updateEvent(eventId: string, eventData: any) {
    const token = localStorage.getItem('token'); // ou là où tu stockes ton token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put(`${this.baseUrl}/update/${eventId}`, eventData, { headers });
  }

  // Supprimer un événement
  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer les événements par catégorie
  getEventsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/category/${category}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer un événement par ID
  getEventById(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/details/${eventId}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fonction pour récupérer les headers avec le token d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.error("Token absent dans le localStorage");
    } else {
      console.log("Token trouvé:", token);
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  // Gestion globale des erreurs
  private handleError(error: any) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur réseau: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
