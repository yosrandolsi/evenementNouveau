import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createEvent(event: any): Observable<any> {
    // La méthode POST est utilisée pour envoyer les données de l'événement
    return this.http.post<any>(this.baseUrl, event);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/events/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/events/${id}`);
  }

  getEventsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/events/category/${category}`);
  }

  getEventById(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${eventId}`);
  }
}
