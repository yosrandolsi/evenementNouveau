import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { UserService } from 'src/app/services/user.service';  // Importer UserService
import { Assignment } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input() event: any;  
  @Input() showModal: boolean = false;  
  eventId: string = '';  
  assignments: Assignment[] = [];  
  userNames: { [userId: string]: string } = {};  // Stocker les noms des utilisateurs par leur ID

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private assignmentService: AssignmentService,
    private userService: UserService  // Injection de UserService
  ) {}

  ngOnInit(): void {
    if (!this.event) {
      this.eventId = this.route.snapshot.paramMap.get('id')!;
      this.loadEventDetails();
    }
  }

  loadEventDetails(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (data) => {
        this.event = data;  
        this.loadAssignments();  
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails de l\'événement', err);
      }
    });
  }

  loadAssignments(): void {
    this.assignmentService.getAssignmentsByEvent(this.eventId).subscribe({
      next: (assignments) => {
        this.assignments = assignments;  
        this.loadUserNames();  // Charger les noms des utilisateurs après avoir récupéré les affectations
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des affectations', err);
      }
    });
  }

  loadUserNames(): void {
    this.assignments.forEach((assignment) => {
      this.userService.getUserById(assignment.userId).subscribe({
        next: (user) => {
          this.userNames[assignment.userId] = user.username;  // Stocker le nom d'utilisateur par ID
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des informations utilisateur', err);
        }
      });
    });
  }

  participer(): void {
    if (this.event) {
      this.router.navigate(['/register-event', this.event.id, this.event.category]);
    }
  }

  goBack(): void {
    this.router.navigate(['/gestionevents']);  
  }

  getUserName(userId: string): string {
    return this.userNames[userId] || 'Utilisateur inconnu';  // Retourner le nom d'utilisateur ou 'Utilisateur inconnu'
  }

  onStaffAssigned(staffData: any): void {
    console.log('Personnel affecté mis à jour :', staffData);
    // Recharger les affectations et l'événement après la mise à jour
    this.loadEventDetails();
  }
}
