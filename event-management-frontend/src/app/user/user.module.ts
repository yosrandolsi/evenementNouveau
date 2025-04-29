import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddSkillModalComponent } from './add-skill-modal/add-skill-modal.component'; // ⬅️ Ajoute FormsModule ici

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    UserListComponent,
    UserFormComponent,
    AddSkillModalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule // ⬅️ Et ici dans les imports
  ]
})
export class UserModule {}
