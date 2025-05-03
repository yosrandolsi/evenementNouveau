import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any = {
    id: '',
    username: '',
    email: '',
    role: 'PARTICIPANT',
    operationalRole: null,
    available: true
  };
  roles: string[] = ['ADMIN', 'STAFF', 'PARTICIPANT'];
  organizationalRoles: string[] = ['ANIMATEUR', 'TECHNICIEN', 'HOTE'];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(userId);
    }
  }

  loadUser(userId: string): void {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'utilisateur', error);
        this.router.navigate(['/users']);
      }
    );
  }

  onSubmit(): void {
    if (this.user.id) {
      this.userService.updateUser(this.user.id, this.user).subscribe(
        () => {
          alert('Utilisateur modifié avec succès!');
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
          alert('Erreur lors de la mise à jour de l\'utilisateur');
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
