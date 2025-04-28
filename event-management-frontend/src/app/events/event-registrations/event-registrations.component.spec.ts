import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service'; // adapte le chemin si besoin

@Component({
  selector: 'app-event-registrations',
  templateUrl: './event-registrations.component.html',
  styleUrls: ['./event-registrations.component.css']
})
export class EventRegistrationsComponent implements OnInit {
  registrations: any[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.fetchRegistrations();
  }

  fetchRegistrations(): void {
    this.registrationService.getAllRegistrations().subscribe({
      next: (data) => {
        this.registrations = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des inscriptions:', err);
      }
    });
  }

  acceptRegistration(registration: any): void {
    registration.status = 'Accepté'; // Mettre à jour le statut
    this.registrationService.updateRegistration(registration.id, registration).subscribe({
      next: () => {
        this.fetchRegistrations(); // Recharger la liste
      },
      error: (err) => {
        console.error('Erreur lors de l’acceptation de l’inscription:', err);
      }
    });
  }

  refuseRegistration(registrationId: string): void {
    if (confirm('Êtes-vous sûr de vouloir refuser cette inscription ?')) {
      this.registrationService.deleteRegistration(registrationId).subscribe({
        next: () => {
          this.fetchRegistrations(); // Recharger la liste
        },
        error: (err) => {
          console.error('Erreur lors du refus de l’inscription:', err);
        }
      });
    }
  }
}
