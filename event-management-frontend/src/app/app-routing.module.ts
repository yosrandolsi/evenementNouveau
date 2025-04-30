import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestioneventsComponent } from './events/gestionevents/gestionevents.component';

import { EventsByCategoryComponent } from './events/events-by-category/events-by-category.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { RegisterEventComponent } from './events/register-event/register-event.component';
import { EventRegistrationsComponent } from './events/event-registrations/event-registrations.component'; // ✅ Ajouté ici

// Lazy loading du module utilisateur
const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },

  // Lazy loading du module utilisateur
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

  // Événements
  { path: 'events', component: GestioneventsComponent },

  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'events-by-category/:category', component: EventsByCategoryComponent },
  { path: 'register-event/:id', component: RegisterEventComponent },
  { path: 'register-event/:eventId/:categoryId', component: RegisterEventComponent },

  // Catégories
  { path: 'categories', component: CategoryListComponent },
  { path: 'create-category', component: CategoryFormComponent },

  // Ajouter un événement
  { path: 'add-event', component: AddEventComponent },

  // ✅ Inscriptions (liste des inscriptions)
  { path: 'registrations', component: EventRegistrationsComponent },

  // Fallback
  { path: '**', redirectTo: '/events' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
