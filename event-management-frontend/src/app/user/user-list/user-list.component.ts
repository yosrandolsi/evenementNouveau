import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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
  organizationalRoles: string[] = ['ANIMATEUR', 'TECHNICIEN', 'HOTE'];

  // Pour le composant modal
  showSkillModal: boolean = false;
  selectedStaff: any = null;

  constructor(private userService: UserService, private router: Router) {}

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

  updateOperationalRole(user: any): void {
    const updatedData = {
      operationalRole: user.operationalRole // Seul le rôle organisationnel est envoyé
    };
  
    this.userService.updateUser(user.id, updatedData).subscribe(
      () => {
        console.log('Rôle organisationnel mis à jour pour', user.username);
  
        // Mettre à jour localement le rôle organisationnel de l'utilisateur
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index].operationalRole = user.operationalRole; // Mise à jour du rôle opérationnel uniquement
        }
  
        this.filterByRole(this.selectedRole); // Refiltrer la liste des utilisateurs si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rôle organisationnel', error);
      }
    );
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
        this.filterByRole('STAFF');
      },
      (error) => {
        console.error('Erreur de rechargement après modification des compétences', error);
      }
    );
  }

  // ---------- SUPPRESSION D'UTILISATEUR ----------
  deleteUser(userId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== userId);
          this.filterByRole(this.selectedRole); // Refiltrer les utilisateurs après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    }
  }

  openEditUser(user: any): void {
    // Rediriger vers la page d'édition d'utilisateur
    this.router.navigate(['/user/edit-user', user.id]); // Assurez-vous que le chemin est correct
  }
  
}
