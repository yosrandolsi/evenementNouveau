import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionevents',
  templateUrl: './gestionevents.component.html',
  styleUrls: ['./gestionevents.component.css']
})
export class GestioneventsComponent implements OnInit {

  events: any[] = [];
  categories: any[] = [];
  selectedCategory: string = 'all';
  selectedEvent: any = {};
  selectedDetailEvent: any = {};  // L'événement sélectionné pour les détails
  showModal: boolean = false;
  showCreateEventModal: boolean = false;  // Modal de création d'événement
  showDetailModal: boolean = false;  // Modal de détails
  noEventsMessage: string = '';

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.refreshEvents();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Erreur lors du chargement des catégories', err)
    });
  }

  refreshEvents(): void {
    if (this.selectedCategory === 'all') {
      this.eventService.getAllEvents().subscribe({
        next: (data) => {
          this.events = data;
          this.checkNoEventsMessage();
        },
        error: (err) => console.error('Erreur lors du chargement des événements', err)
      });
    } else {
      this.eventService.getEventsByCategory(this.selectedCategory).subscribe({
        next: (data) => {
          this.events = data;
          this.checkNoEventsMessage();
        },
        error: (err) => console.error('Erreur lors du filtrage par catégorie', err)
      });
    }
  }

  checkNoEventsMessage(): void {
    if (this.events.length === 0) {
      this.noEventsMessage = `Aucun événement trouvé pour la catégorie "${this.selectedCategory}"`;
    } else {
      this.noEventsMessage = '';
    }
  }

  onCategoryChange(): void {
    this.refreshEvents();
  }

  openUpdateModal(event: any): void {
    this.selectedEvent = { ...event };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  updateEvent(updatedEvent: any): void {
    const index = this.events.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
      this.events[index] = updatedEvent;
    }
    this.closeModal();
  }

  deleteEvent(event: any): void {
    this.eventService.deleteEvent(event.id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== event.id);
      },
      error: (err) => console.error('Erreur lors de la suppression', err)
    });
  }

  // Ouvrir le modal de création d'événement
  openCreateEventModal(): void {
    this.showCreateEventModal = true;  // Ouvrir le modal de création
  }

  // Fermer le modal de création d'événement
  closeCreateEventModal(): void {
    this.showCreateEventModal = false;  // Fermer le modal de création
  }

  // Quand un événement est créé
  onEventCreated(): void {
    this.refreshEvents();  // Rafraîchir la liste des événements
    this.closeCreateEventModal();  // Fermer le modal
  }

  // Ouvrir le modal de détails
  showEventDetails(event: any): void {
    this.selectedDetailEvent = event;
    this.showDetailModal = true;  // Ouvrir le modal de détails
  }

  // Fermer le modal des détails
  closeDetailModal(): void {
    this.showDetailModal = false;  // Fermer le modal
  }
}
