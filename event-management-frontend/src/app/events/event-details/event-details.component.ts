import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input() event: any;  // Ajout de 'event' comme @Input() pour recevoir les données de l'événement
  @Input() showModal: boolean = false;  // Ajout de 'showModal' comme @Input() si nécessaire pour la gestion du modal
  eventId: string = '';  // ID de l'événement

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.event) {
      this.eventId = this.route.snapshot.paramMap.get('id')!;
      this.loadEventDetails();
    }
  }

  loadEventDetails(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (data) => {
        this.event = data;  // Stocker les détails de l'événement
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails de l\'événement', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/gestionevents']);  // Rediriger vers la page de gestion des événements
  }
}
