import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  @Output() eventCreated = new EventEmitter<void>();
  showModal = false;

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
    this.showModal = false;
  }

  onCategorySelect(selectedId: string) {
    const selectedCategory = this.categories.find(cat => cat.id === selectedId);
    if (selectedCategory) {
      this.newEvent.category.id = selectedCategory.id!;
      this.newEvent.category.name = selectedCategory.name ?? '';
    }
  }
  
  createEvent() {
    console.log('Event data to send:', this.newEvent);
    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        this.eventCreated.emit();
        this.closeModal();
        alert('Événement créé avec succès!');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de l\'événement. Vérifiez les champs.');
      }
    });
  }
}
