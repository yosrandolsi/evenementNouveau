import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { EventService } from '../../services/event.service'; // Assurez-vous d'importer EventService

@Component({
  selector: 'app-event-registrations',
  templateUrl: './event-registrations.component.html',
  styleUrls: ['./event-registrations.component.css']
})
export class EventRegistrationsComponent implements OnInit {
  registrations: any[] = [];

  constructor(
    private registrationService: RegistrationService,
    private eventService: EventService // Injection du service EventService
  ) {}

  ngOnInit(): void {
    this.fetchRegistrations();
  }

  fetchRegistrations(): void {
    this.registrationService.getAllRegistrations().subscribe({
      next: (data) => {
        // Pour chaque inscription, récupérer l'événement par son ID
        this.registrations = data.map(registration => {
          this.eventService.getEventById(registration.eventId).subscribe({
            next: (event) => {
              // Ajouter le nom de l'événement à l'inscription
              registration.eventName = event.title; 
            },
            error: (err) => {
              console.error('Erreur lors de la récupération de l\'événement:', err);
            }
          });
          return registration;
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des inscriptions:', err);
      }
    });
  }

  acceptRegistration(registration: any): void {
    if (registration.status === 'Accepté') {
      return;  // Si déjà accepté, on ne fait rien
    }
  
    const updatedRegistration = { ...registration, status: 'Accepté' };
  
    // Afficher les données dans la console (ou utiliser un toast, un modal, etc.)
    console.log('Inscription acceptée :', updatedRegistration);
  
    this.registrationService.updateRegistration(registration.id, updatedRegistration).subscribe({
      next: () => {
        // Rafraîchir la liste après la mise à jour
        this.fetchRegistrations();
      },
      error: (err) => {
        console.error('Erreur lors de l’acceptation de l’inscription :', err);
      }
    });
  }
  

  refuseRegistration(registration: any): void {
    if (confirm('Êtes-vous sûr de vouloir refuser cette inscription ?')) {
      this.registrationService.deleteRegistration(registration.id).subscribe({
        next: () => {
          this.registrations = this.registrations.filter(r => r.id !== registration.id); // Supprimer localement
        },
        error: (err) => {
          console.error('Erreur lors du refus de l\'inscription:', err);
        }
      });
    }
  }
}
