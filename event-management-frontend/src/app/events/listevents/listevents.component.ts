import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css']
})
export class ListeventsComponent implements OnInit {
  @Input() events: any[] = [];
  @Output() updateEvent = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() showDetails = new EventEmitter<any>();
  role: string='';
  constructor(private router: Router) {}  // Injecter Router
  ngOnInit(): void {
    this.role = localStorage.getItem("role")?.trim() || "";
  }

  deleteEvent(event: any): void {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.delete.emit(event);
    }
  }

  openUpdateModal(event: any): void {
    this.updateEvent.emit(event);
  }

  openDetails(event: any): void {
    this.router.navigate(['/event-details', event.id]); // Naviguer vers la page de détails
  }
}
