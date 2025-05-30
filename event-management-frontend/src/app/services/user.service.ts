import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un utilisateur par ID
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel utilisateur
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  // Mettre à jour un utilisateur
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData);
  }

  // Supprimer un utilisateur
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateGlobalRole(id: string, newRole: string): Observable<any> {
    const body = { role: newRole }; // JSON correct
    return this.http.put<any>(`${this.apiUrl}/${id}/role`, body);
  }
  

  updateOperationalRole(id: string, newOperationalRole: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/operational-role`, { operationalRole: newOperationalRole });
  }
  // Mettre à jour les compétences d’un utilisateur
updateUserSkills(id: string, skills: string[]): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}/skills`, skills);
}
// Obtenir les utilisateurs disponibles par rôle et catégorie (compétence)
getAvailableStaff(role: string, category: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/available-staff`, {
    params: {
      role: role,
      category: category
    }
  });
}
getStaffByRole(role: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/role/${role}`);
}
getStaffByOperationalRole(operationalRole: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/by-operational-role?operationalRole=${operationalRole}`);
}
// Ajouter cette méthode dans le UserService
countUsersByRole(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/countByRole`);
}

}
