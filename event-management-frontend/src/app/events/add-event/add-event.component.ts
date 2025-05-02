import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() eventCreated = new EventEmitter<void>();

  event = {
    title: '',
    category: '',  // sera le nom de la catégorie
    description: '',
    date: '',
    location: '',
    maxParticipants: 0,
    requiredAnimateurs: 0,
    requiredTechniciens: 0,
    requiredHotes: 0
  };

  categories: any[] = [];

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories', err);
      }
    });
  }

  onSubmit(): void {
    this.eventService.saveEvent(this.event).subscribe({
      next: (response) => {
        console.log('Événement ajouté avec succès:', response);
        this.eventCreated.emit();
        this.closeModal();
        this.router.navigate(['/events']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'événement:', error);
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
