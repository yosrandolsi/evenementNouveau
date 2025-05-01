import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assign-staff',
  templateUrl: './assign-staff.component.html',
  styleUrls: ['./assign-staff.component.css']
})
export class AssignStaffComponent implements OnInit {
  @Input() event: any;
  @Output() staffAssigned = new EventEmitter<any>();

  availableStaff: any[] = [];
  assignedStaff: { [key: string]: any[] } = {};
  selectedRole: string = '';
  selectedStaff: string[] = [];
  showStaffList: boolean = false;

  constructor(
    private userService: UserService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    if (this.event) {
      this.loadAllAssignedStaff();
    }
  }

  loadAllAssignedStaff(): void {
    this.assignmentService.getStaffByEvent(this.event.id).subscribe({
      next: (data) => {
        this.assignedStaff = data;
        this.staffAssigned.emit(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du personnel affecté', err);
      }
    });
  }

  getRequiredCount(role: string): number {
    switch (role) {
      case 'ANIMATEUR': return this.event.requiredAnimateurs;
      case 'TECHNICIEN': return this.event.requiredTechniciens;
      case 'HOTE': return this.event.requiredHotes;
      default: return 0;
    }
  }

  getAssignedCount(role: string): number {
    return this.assignedStaff[role]?.length || 0;
  }

  canAssign(role: string): boolean {
    return this.getAssignedCount(role) < this.getRequiredCount(role);
  }

  showStaff(role: string): void {
    this.selectedRole = role;
    this.selectedStaff = [];
    this.showStaffList = true;

    if (!this.canAssign(role)) {
      alert(`Le nombre requis de ${role}s est déjà atteint.`);
      return;
    }

    this.userService.getStaffByOperationalRole(role).subscribe({
      next: (data) => {
        this.availableStaff = data;
      },
      error: (err) => {
        console.error(`Erreur lors du chargement des ${role}s`, err);
      }
    });
  }

  toggleStaffSelection(staffId: string): void {
    const index = this.selectedStaff.indexOf(staffId);
    if (index === -1) {
      if (this.selectedStaff.length + this.getAssignedCount(this.selectedRole) >= this.getRequiredCount(this.selectedRole)) {
        alert(`Nombre maximum de ${this.selectedRole}s atteint.`);
        return;
      }
      this.selectedStaff.push(staffId);
    } else {
      this.selectedStaff.splice(index, 1);
    }
  }

  assignStaff(): void {
    if (this.selectedStaff.length === 0) {
      alert('Veuillez sélectionner au moins un membre du personnel.');
      return;
    }
  
    const assignments = this.selectedStaff.map(staffId => ({
      userId: staffId,
      eventId: this.event.id,
      operationalRole: this.selectedRole,
      skill: this.selectedRole // Utilisation du rôle comme compétence ici
    }));
  
    let assigned = 0;
    assignments.forEach(assignment => {
      this.assignmentService.createAssignment(assignment).subscribe({
        next: (data) => {
          assigned++;
          // Affichage de l'ID de l'utilisateur affecté
          console.log(`Personnel affecté: ${data.userId} à l'événement ${this.event.id} avec le rôle ${this.selectedRole}`);
          alert(`Utilisateur avec ID: ${data.userId} affecté au rôle ${this.selectedRole}`);
  
          if (assigned === assignments.length) {
            this.loadAllAssignedStaff();
            this.showStaffList = false;
            this.selectedStaff = [];
          }
        },
        error: (err) => {
          console.error('Erreur lors de l\'affectation', err);
        }
      });
    });
  }
}  