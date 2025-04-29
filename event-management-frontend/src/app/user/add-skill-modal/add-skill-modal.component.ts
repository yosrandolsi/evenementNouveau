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

  allSkills: string[] = ['technicien', 'son', 'video', 'lumière', 'gestion', 'photo'];
  updatedSkills: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Assure qu'on a bien un tableau, même vide
    this.updatedSkills = this.user?.skills ? [...this.user.skills] : [];
  }

  toggleSkill(skill: string): void {
    if (this.updatedSkills.includes(skill)) {
      this.updatedSkills = this.updatedSkills.filter(s => s !== skill);
    } else {
      this.updatedSkills.push(skill);
    }

    // Enregistre immédiatement après modification
    const updatedUser = { ...this.user, skills: this.updatedSkills };
    this.userService.updateUser(this.user.id, updatedUser).subscribe(
      () => {
        this.user.skills = [...this.updatedSkills]; // mettre à jour l'affichage
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des compétences', error);
      }
    );
  }

  saveSkills(): void {
    this.closeModal.emit();
  }

  cancel(): void {
    this.closeModal.emit();
  }
}
