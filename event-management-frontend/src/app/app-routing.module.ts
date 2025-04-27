import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestioneventsComponent } from './events/gestionevents/gestionevents.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventsByCategoryComponent } from './events/events-by-category/events-by-category.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { AddEventComponent } from './events/add-event/add-event.component';  // Assurez-vous que le chemin est correct

// Lazy loading du module utilisateur
const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },

  // Module utilisateur (login, register)
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

  // Événements
  { path: 'events', component: GestioneventsComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'events-by-category/:category', component: EventsByCategoryComponent },

  // Catégories
  { path: 'categories', component: CategoryListComponent },
  { path: 'create-category', component: CategoryFormComponent },
  { path: 'add-event', component: AddEventComponent },
  // Route fallback (page non trouvée)
  { path: '**', redirectTo: '/events' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
