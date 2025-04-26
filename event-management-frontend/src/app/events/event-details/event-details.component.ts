import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {

  @Input() event: any; // Détails de l'événement
  @Input() showModal: boolean = false; // Afficher ou masquer le modal
  @Output() close = new EventEmitter<void>(); // Émet un événement pour fermer le modal

  ngOnChanges() {
    // Log pour vérifier que les détails sont bien reçus
    if (this.event) {
      console.log("Détails de l'événement dans le composant enfant:", this.event);
    }
  }

  closeModal(): void {
    this.close.emit(); // Fermer le modal
  }
}
