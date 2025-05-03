import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-all-assignments',
  templateUrl: './all-assignments.component.html',
  styleUrls: ['./all-assignments.component.css']
})
export class AllAssignmentsComponent implements OnInit {
  assignments: any[] = [];
  filteredAssignments: any[] = [];
  
  userDetails: { 
    [userId: string]: { 
      username: string, 
      operationalRole: string,
      avatar?: string 
    } 
  } = {};
  
  eventDetails: { 
    [eventId: string]: { 
      title: string,
      date?: string,
      location?: string 
    } 
  } = {};

  // Filtres
  searchText: string = '';
  roleFilter: string = '';
  isLoading: boolean = true;

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.assignmentService.getAllAssignments().subscribe({
      next: (assignments) => {
        this.assignments = assignments;
        this.filteredAssignments = [...assignments];
        this.loadUserAndEventDetails();
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.isLoading = false;
      }
    });
  }

  loadUserAndEventDetails(): void {
    const uniqueUserIds = [...new Set(this.assignments.map(a => a.userId))];
    const uniqueEventIds = [...new Set(this.assignments.map(a => a.eventId))];

    uniqueUserIds.forEach(userId => {
      this.userService.getUserById(userId).subscribe({
        next: user => {
          this.userDetails[userId] = {
            username: user.username,
            operationalRole: user.operationalRole || 'Non défini',
            avatar: user.avatar || 'assets/images/default-avatar.png'
          };
          this.checkLoadingComplete();
        },
        error: () => {
          this.userDetails[userId] = {
            username: 'Inconnu',
            operationalRole: 'Non défini',
            avatar: 'assets/images/default-avatar.png'
          };
          this.checkLoadingComplete();
        }
      });
    });

    uniqueEventIds.forEach(eventId => {
      this.eventService.getEventById(eventId).subscribe({
        next: event => {
          this.eventDetails[eventId] = {
            title: event.title,
            date: event.date,
            location: event.location
          };
          this.checkLoadingComplete();
        },
        error: () => {
          this.eventDetails[eventId] = {
            title: 'Événement inconnu',
            date: 'Non disponible',
            location: 'Non disponible'
          };
          this.checkLoadingComplete();
        }
      });
    });

    if (uniqueUserIds.length === 0 && uniqueEventIds.length === 0) {
      this.isLoading = false;
    }
  }

  checkLoadingComplete(): void {
    const allUsersLoaded = Object.keys(this.userDetails).length === 
      new Set(this.assignments.map(a => a.userId)).size;
    const allEventsLoaded = Object.keys(this.eventDetails).length === 
      new Set(this.assignments.map(a => a.eventId)).size;
    
    if (allUsersLoaded && allEventsLoaded) {
      this.isLoading = false;
      this.applyFilters();
    }
  }

  applyFilters(): void {
    this.filteredAssignments = this.assignments.filter(assignment => {
      const user = this.userDetails[assignment.userId] || {};
      const event = this.eventDetails[assignment.eventId] || {};
      
      const matchesSearch = this.searchText === '' || 
        user.username?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        event.title?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.operationalRole?.toLowerCase().includes(this.searchText.toLowerCase());
      
      const matchesRole = this.roleFilter === '' || 
        user.operationalRole?.toLowerCase() === this.roleFilter.toLowerCase();
      
      return matchesSearch && matchesRole;
    });
  }

  getUniqueRoles(): string[] {
    const roles = new Set<string>();
    this.assignments.forEach(a => {
      const role = this.userDetails[a.userId]?.operationalRole;
      if (role) roles.add(role);
    });
    return Array.from(roles);
  }

  refreshData(): void {
    this.userDetails = {};
    this.eventDetails = {};
    this.loadData();
  }

  // Méthodes d'accès aux données
  getUsername(userId: string): string {
    return this.userDetails[userId]?.username || 'Chargement...';
  }

  getOperationalRole(userId: string): string {
    return this.userDetails[userId]?.operationalRole || 'Non défini';
  }

  getEventTitle(eventId: string): string {
    return this.eventDetails[eventId]?.title || 'Chargement...';
  }
  deleteAssignment(assignmentId: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette affectation ?')) {
      this.assignmentService.deleteAssignment(assignmentId).subscribe({
        next: () => {
          this.refreshData(); // recharge les données après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          alert('Échec de la suppression.');
        }
      });
    }
  }
  
  
}
