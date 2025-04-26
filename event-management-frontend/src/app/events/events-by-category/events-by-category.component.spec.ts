import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/AppEvent';

@Component({
  selector: 'app-events-by-category',
  templateUrl: './events-by-category.component.html',
  styleUrls: ['./events-by-category.component.css']
})
export class EventsByCategoryComponent implements OnInit {
  categoryName!: string;
  events: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('category')!;
    this.eventService.getEventsByCategory(this.categoryName).subscribe(data => {
      this.events = data;
    });
  }
}
