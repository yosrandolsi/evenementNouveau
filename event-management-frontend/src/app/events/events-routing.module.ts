import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListeventsComponent } from './listevents/listevents.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { EventsByCategoryComponent } from './events-by-category/events-by-category.component';
import { GestioneventsComponent } from './gestionevents/gestionevents.component';
import { RegisterEventComponent } from './register-event/register-event.component';
const routes: Routes = [
  
  { path: 'register-event/:id', component: RegisterEventComponent }, 
  { path: '', component: ListeventsComponent },
  { path: 'assignments', component: AssignmentListComponent },
  { path: 'update/:id', component: UpdateEventComponent },
  { path: 'details/:id', component: EventDetailsComponent },
  { path: 'by-category/:categoryId', component: EventsByCategoryComponent },
  { path: 'gestion', component: GestioneventsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
