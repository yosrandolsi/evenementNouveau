import { Component, EventEmitter, Output, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  @Input() showModal: boolean = false;  // Contrôle l'affichage du modal
  @Output() eventCreated = new EventEmitter<void>();  // Émet pour signaler que l'événement a été créé
  @Output() close = new EventEmitter<void>();  // Émet pour fermer le modal

  categories: Category[] = [];

  newEvent = {
    title: '',
    category: { id: '', name: '' },
    description: '',
    date: '',
    location: '',
    maxParticipants: 0
  };

  constructor(private eventService: EventService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  openModal() {
    this.newEvent = {
      title: '',
      category: { id: '', name: '' },
      description: '',
      date: '',
      location: '',
      maxParticipants: 0
    };
    this.showModal = true;
  }

  closeModal() {
    this.close.emit();
  }

  onCategorySelect(selectedId: string) {
    const selectedCategory = this.categories.find(cat => cat.id === selectedId);
    if (selectedCategory) {
      this.newEvent.category.id = selectedCategory.id!;
      this.newEvent.category.name = selectedCategory.name ?? '';
    }
  }
  
  createEvent() {
    // Afficher dans la console les données du formulaire
  /*  console.log('Données de l\'événement à créer:', this.newEvent);
  
    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        this.eventCreated.emit();  // Émet le signal que l'événement a été créé
        this.closeModal();
        alert('Événement créé avec succès!');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de l\'événement. Vérifiez les champs.');
      }
    });
  }*/
  }
  
}
