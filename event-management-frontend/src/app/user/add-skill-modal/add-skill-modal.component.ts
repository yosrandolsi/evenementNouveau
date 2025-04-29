import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-skill-modal',
  templateUrl: './add-skill-modal.component.html',
  styleUrls: ['./add-skill-modal.component.css']
})
export class AddSkillModalComponent implements OnInit {
  @Input() user: any;
  @Input() isModalOpen: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  // Liste des rôles organisationnels possibles (en majuscules)
  organizationalRoles: string[] = ['ANIMATEUR', 'TECHNICIEN', 'HÔTE'];

  // Compétences par rôle (en majuscules)
  roleSkills: { [key: string]: string[] } = {
    ANIMATEUR: ['ANIMATION DE GROUPE', 'GESTION DE PROJETS', 'COMMUNICATION'],
    TECHNICIEN: ['SONORISATION', 'VIDÉO', 'INSTALLATION'],
    HOTE: ['ACCUEIL DES INVITÉS', 'GESTION D\'ÉVÉNEMENTS', 'LOGISTIQUE']
  };

  // Compétences actuelles de l'utilisateur
  updatedSkills: string[] = [];
  selectedRole: string = '';  // Rôle sélectionné pour le staff

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('Utilisateur:', this.user);
    console.log('Rôle opérationnel initial:', this.user?.operationalRole);

    // Récupérer le rôle opérationnel et ajuster la casse en majuscules
    this.selectedRole = this.user?.operationalRole ? this.user.operationalRole.toUpperCase() : '';  
    console.log('selectedRole après initialisation:', this.selectedRole);

    // Vérifier si le rôle existe dans roleSkills
    if (this.roleSkills[this.selectedRole]) {
      this.updatedSkills = [...this.roleSkills[this.selectedRole]];
      console.log('Compétences chargées:', this.updatedSkills);
    } else {
      console.error("Aucun rôle valide trouvé pour l'utilisateur", this.user);
    }
  }

  // Changer de rôle organisationnel
  onRoleChange(role: string): void {
    this.selectedRole = role.toUpperCase();  // Assurez-vous que la casse est en majuscules
    this.updateSkillsBasedOnRole();  // Met à jour les compétences en fonction du rôle sélectionné
  }

  // Met à jour les compétences en fonction du rôle sélectionné
  updateSkillsBasedOnRole(): void {
    if (this.selectedRole && this.roleSkills[this.selectedRole]) {
      // Charger les compétences spécifiques à ce rôle
      this.updatedSkills = [...this.roleSkills[this.selectedRole]];  // Remplace les compétences par celles du rôle
    }
  }

  // Ajouter ou retirer une compétence
  toggleSkill(skill: string): void {
    if (this.updatedSkills.includes(skill)) {
      this.updatedSkills = this.updatedSkills.filter(s => s !== skill);
    } else {
      this.updatedSkills.push(skill);
    }
  }

  saveSkills(): void {
    // D'abord mettre à jour les compétences
    this.userService.updateUserSkills(this.user.id, this.updatedSkills).subscribe(
      () => {
        // Ensuite mettre à jour le rôle organisationnel
        this.userService.updateOperationalRole(this.user.id, this.selectedRole).subscribe(
          () => {
            this.user.skills = [...this.updatedSkills];
            this.user.operationalRole = this.selectedRole;
            this.closeModal.emit(); // Fermer le modal après mise à jour
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du rôle opérationnel', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des compétences', error);
      }
    );
  }
  
  // Annuler l'édition
  cancel(): void {
    this.closeModal.emit();  // Ferme le modal sans enregistrer
  }
}
