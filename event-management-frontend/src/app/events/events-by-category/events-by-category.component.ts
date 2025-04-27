import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-by-category',
  templateUrl: './events-by-category.component.html',
  styleUrls: ['./events-by-category.component.css']
})
export class EventsByCategoryComponent implements OnInit {
  categoryName: string = '';
  events: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const categoryParam = this.route.snapshot.paramMap.get('category');

    if (categoryParam) {
      this.categoryName = categoryParam;
      this.loadEventsByCategory();
    } else {
      this.errorMessage = "Aucune catégorie spécifiée.";
    }
  }

  private loadEventsByCategory(): void {
    this.eventService.getEventsByCategory(this.categoryName).subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des événements:', err);
        this.errorMessage = 'Erreur lors du chargement des événements.';
      }
    });
  }
}
