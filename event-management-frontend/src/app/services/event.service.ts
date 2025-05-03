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
        catchError(this.handleError) // Gestion des erreurs
      );
  }

  // Mettre à jour un événement existant (nouvelle version)
  updateEvent(eventId: string, eventData: any): Observable<any> {
    const headers = this.getAuthHeaders();  // Récupérer les headers avec le token
    return this.http.put(`${this.baseUrl}/update/${eventId}`, eventData, { headers })
      .pipe(
        catchError(this.handleError)
      );
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

  // Récupérer un événement par son ID
  getEventById(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/details/${eventId}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fonction pour récupérer les headers avec le token d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtenir le token du service d'authentification
    if (!token) {
      console.error("Token absent dans le localStorage");
    } else {
      console.log("Token trouvé:", token);  // Log pour vérifier le token
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Ajouter le token pour l'authentification
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
    return throwError(() => new Error(errorMessage));  // Retourner l'erreur
  }

  // Ajouter un événement
  saveEvent(event: any): Observable<any> {
    const headers = this.getAuthHeaders();  // Récupérer les headers avec le token
    return this.http.post<any>(`${this.baseUrl}/create`, event, { headers })
      .pipe(
        catchError(this.handleError)  // Gestion des erreurs
      );
  }
  // Récupérer le nombre d'événements par catégorie
countEventsByCategories(): Observable<Map<string, number>> {
  return this.http.get<Map<string, number>>(`${this.baseUrl}/count-by-categories`, { headers: this.getAuthHeaders() })
    .pipe(
      catchError(this.handleError)
    );
}
// Récupérer toutes les dates des événements
getAllEventDates(): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/dates`, { headers: this.getAuthHeaders() })
    .pipe(
      catchError(this.handleError)
    );
}

}
