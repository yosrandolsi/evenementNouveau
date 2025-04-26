import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { CategoryService } from 'src/app/services/category.service';

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
  selectedDetailEvent: any = {}; // L'événement sélectionné pour les détails
  showModal: boolean = false;
  showDetailModal: boolean = false; // Affichage du modal de détails
  noEventsMessage: string = ''; // Message pour afficher "Aucun événement trouvé"

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.refreshEvents(); // Charger les événements au démarrage
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
      this.noEventsMessage = ''; // Si des événements sont trouvés, on cache le message
    }
  }

  onCategoryChange(): void {
    this.refreshEvents(); // Rafraîchir les événements quand la catégorie change
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

  // Ouvrir le modal de détails
  showEventDetails(event: any): void {
    this.eventService.getEventById(event.id).subscribe({
      next: (data) => {
        console.log('Détails récupérés:', data);
        this.selectedDetailEvent = data; // Stocker les détails dans selectedDetailEvent
        this.showDetailModal = true; // Affiche le modal
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de l\'événement', err);
      }
    });
  }

  // Fermer le modal des détails
  closeDetailModal(): void {
    this.showDetailModal = false;
  }
}
