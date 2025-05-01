import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Assignment {
  id?: string;
  eventId: string;
  userId: string;
  role: string;
  skill?: string;  // Optionnel si tu veux inclure des compétences
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private baseUrl = 'http://localhost:8080/assignments';  // Assure-toi que l'URL corresponde à ton backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les affectations
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.baseUrl);
  }

  

  // Assigner un membre du personnel à un événement avec un rôle
  assignStaffToEvent(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(`${this.baseUrl}/assign`, assignment);
  }

  // Supprimer une affectation par ID (si nécessaire)
  deleteAssignment(assignmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${assignmentId}`);
  }
  getAssignmentsByEvent(eventId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.baseUrl}/event/${eventId}`);
  }
  
  

  // Récupérer le personnel affecté à un événement
  getStaffByEvent(eventId: string): Observable<{ [key: string]: any[] }> {
    return this.http.get<{ [key: string]: any[] }>(`${this.baseUrl}/by-event/${eventId}`);
  }
  

  createAssignment(assignment: { userId: string, eventId: string, operationalRole: string, skill: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/assign`, assignment);
  }
  
}
