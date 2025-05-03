import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EditUserComponent } from './edit-user/edit-user.component'; // Importation du composant EditUser

const routes: Routes = [
  // Route de login
  { path: 'login', component: LoginComponent },

  // Route d'inscription
  { path: 'register', component: RegisterComponent },

  // Route pour afficher la liste des utilisateurs
  { path: 'users', component: UserListComponent },

  // Route pour ajouter un nouvel utilisateur
  { path: 'add-user', component: UserFormComponent },

  // Route pour modifier un utilisateur
  { path: 'edit-user/:id', component: EditUserComponent }, // Nouvelle route d'édition

  // Par défaut, rediriger vers la liste des utilisateurs
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
