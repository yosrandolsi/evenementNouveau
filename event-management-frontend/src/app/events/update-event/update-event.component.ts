import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  @Input() event: any = {}; // Reçu du parent
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<any>();

  constructor(private eventService: EventService) {}

  closeModal() {
    this.close.emit();
  }

  updateEvent() {
    this.eventService.updateEvent(this.event.id, this.event).subscribe({
      next: (res) => {
        this.updated.emit(this.event);
        this.closeModal();
      },
      error: (err) => console.error('Erreur lors de la mise à jour', err)
    });
  }
}
