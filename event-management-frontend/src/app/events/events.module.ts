import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';
import { AssignmentListComponent } from './assignment-list/assignment-list.component'; // Ajoute cette ligne


import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsByCategoryComponent } from './events-by-category/events-by-category.component';
import { GestioneventsComponent } from './gestionevents/gestionevents.component';
import { ListeventsComponent } from './listevents/listevents.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { RegisterEventComponent } from './register-event/register-event.component';
import { EventRegistrationsComponent } from './event-registrations/event-registrations.component';
import { AssignStaffComponent } from './assign-staff/assign-staff.component';
@NgModule({
  declarations: [
 
    EventDetailsComponent,
    EventsByCategoryComponent,
    AddEventComponent,
    GestioneventsComponent,
    ListeventsComponent,
    UpdateEventComponent,
    RegisterEventComponent,
    EventRegistrationsComponent,
    AssignStaffComponent, AssignmentListComponent 
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    EventsRoutingModule
  ]
})
export class EventsModule {}
