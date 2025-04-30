import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';  // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  @Input() showModal: boolean = false;  // Reçoit la propriété showModal du parent
  @Output() close = new EventEmitter<void>();  // Émet un événement quand on ferme le modal
  @Output() eventCreated = new EventEmitter<void>();  // Émet un événement quand l'événement est créé

  event = {
    title: '',
    category: '',
    description: '',
    date: '',
    location: '',
    maxParticipants: 0,
    requiredAnimateurs: 0,
    requiredTechniciens: 0,
    requiredHotes: 0
  };

  constructor(private eventService: EventService, private router: Router) { }

  // Fonction pour soumettre le formulaire
  onSubmit(): void {
    this.eventService.saveEvent(this.event).subscribe(
      response => {
        console.log('Événement ajouté avec succès:', response);
        this.eventCreated.emit();  // Émettre un événement pour notifier le parent que l'événement est créé
        this.closeModal();  // Fermer le modal après l'ajout
        this.router.navigate(['/events']);  // Rediriger vers la liste des événements ou une autre page
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'événement:', error);
      }
    );
  }

  // Fonction pour fermer le modal
  closeModal(): void {
    this.close.emit();  // Émettre l'événement pour fermer le modal
  }
}
