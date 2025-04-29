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

  // Liste des rôles organisationnels possibles
  organizationalRoles: string[] = ['Animateur', 'Technicien', 'Hôte'];

  // Compétences par rôle
  roleSkills: { [key: string]: string[] } = {
    Animateur: ['Animation de groupe', 'Gestion de projets', 'Communication'],
    Technicien: ['Sonorisation', 'Vidéo', 'Installation'],
    Hôte: ['Accueil des invités', 'Gestion d\'événements', 'Logistique']
  };

  // Compétences actuelles de l'utilisateur
  updatedSkills: string[] = [];
  selectedRole: string = '';  // Rôle sélectionné pour le staff

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Initialisation des compétences de l'utilisateur et du rôle
    this.updatedSkills = this.user?.skills ? [...this.user.skills] : [];
    this.selectedRole = this.user?.organizationalRole || ''; // Récupère le rôle organisationnel actuel
  }

  // Changer de rôle organisationnel
  onRoleChange(role: string): void {
    this.selectedRole = role;
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

  // Enregistrer les modifications
  saveSkills(): void {
    const updatedUser = { ...this.user, skills: this.updatedSkills, organizationalRole: this.selectedRole };
    this.userService.updateUser(this.user.id, updatedUser).subscribe(
      () => {
        this.user.skills = [...this.updatedSkills];  // Met à jour les compétences affichées
        this.user.organizationalRole = this.selectedRole;  // Met à jour le rôle affiché
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des compétences', error);
      }
    );
    this.closeModal.emit();  // Ferme le modal après l'enregistrement
  }

  // Annuler l'édition
  cancel(): void {
    this.closeModal.emit();  // Ferme le modal sans enregistrer
  }
}
