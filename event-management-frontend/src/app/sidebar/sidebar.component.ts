import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // ajuste le chemin selon ton projet

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: string = '';
  username: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem("role")?.trim() || "";
    const userId = localStorage.getItem("userId");

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        user => {
          this.username = user.username || 'Utilisateur';  // ou user.nom, selon ta structure
        },
        error => {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
          this.username = 'Utilisateur';
        }
      );
    }
  }
}
