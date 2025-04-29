import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedRole: string = '';
  editingRoleUserId: string | null = null;
  newRole: string = '';
  roles: string[] = ['ADMIN', 'STAFF', 'PARTICIPANT'];

  // Pour le composant modal
  showSkillModal: boolean = false;
  selectedStaff: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = this.selectedRole ? this.users.filter(u => u.role === this.selectedRole) : this.users;
      },
      (error) => {
        console.error('Erreur de chargement des utilisateurs', error);
      }
    );
  }

  filterByRole(role: string): void {
    this.selectedRole = role;
    this.filteredUsers = this.users.filter(user => user.role === role);
  }

  startEditingRole(userId: string, currentRole: string): void {
    this.editingRoleUserId = userId;
    this.newRole = currentRole;
  }

  updateRole(userId: string): void {
    if (this.newRole) {
      this.userService.updateUser(userId, { role: this.newRole }).subscribe(
        () => {
          const index = this.users.findIndex(user => user.id === userId);
          if (index !== -1) {
            this.users[index].role = this.newRole;
          }
          this.filterByRole(this.selectedRole);
          this.editingRoleUserId = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du rôle', error);
        }
      );
    }
  }

  cancelEditing(): void {
    this.editingRoleUserId = null;
  }

  // ---------- GESTION MODAL DE COMPÉTENCES POUR STAFF ----------

  openSkillModal(user: any): void {
    this.selectedStaff = user;
    this.showSkillModal = true;
  }

  closeSkillModal(): void {
    this.showSkillModal = false;
    this.selectedStaff = null;
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.filterByRole('STAFF'); // Rester sur la liste filtrée des STAFF
      },
      (error) => {
        console.error('Erreur de rechargement après modification des compétences', error);
      }
    );
  }
}
