import { Component, OnInit } from '@angular/core';
import { AssignmentService, Assignment } from 'src/app/services/assignment.service';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  assignments: any[] = [];
  userNames: { [userId: string]: string } = {};
  eventNames: { [eventId: string]: string } = {};

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.assignmentService.getAllAssignments().subscribe({
      next: data => {
        this.assignments = data;
        this.loadUserNames();
        this.loadEventNames();
      },
      error: err => console.error('Erreur de chargement des affectations', err)
    });
  }

  // Charge les noms d'utilisateur à partir de leur ID
  loadUserNames(): void {
    const userIds = [...new Set(this.assignments.map(a => a.userId))];
    userIds.forEach(userId => {
      this.userService.getUserById(userId).subscribe({
        next: user => {
          console.log('Utilisateur récupéré:', user);
          this.userNames[userId] = user.username || 'Nom inconnu';
        },
        error: err => {
          console.error(`Erreur lors du chargement de l'utilisateur ${userId}`, err);
          this.userNames[userId] = 'Utilisateur introuvable';
        }
      });
    });
  }

  // Charge les noms des événements à partir de leur ID
  loadEventNames(): void {
    const eventIds = [...new Set(this.assignments.map(a => a.eventId))];
    eventIds.forEach(eventId => {
      this.eventService.getEventById(eventId).subscribe({
        next: event => {
          console.log('Événement récupéré:', event);
          this.eventNames[eventId] = event.title || 'Nom inconnu';
        },
        error: err => {
          console.error(`Erreur lors du chargement de l'événement ${eventId}`, err);
          this.eventNames[eventId] = 'Événement introuvable';
        }
      });
    });
  }

  // Récupère le nom affichable d'un utilisateur
  getUserName(userId: string): string {
    return this.userNames[userId] || 'Chargement...';
  }

  // Récupère le nom affichable d'un événement
  getEventName(eventId: string): string {
    return this.eventNames[eventId] || 'Chargement...';
  }
}
