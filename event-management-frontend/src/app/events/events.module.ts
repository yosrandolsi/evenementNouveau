import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';

import { CreateEventComponent } from './create-event/create-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsByCategoryComponent } from './events-by-category/events-by-category.component';
import { GestioneventsComponent } from './gestionevents/gestionevents.component';
import { ListeventsComponent } from './listevents/listevents.component';
import { UpdateEventComponent } from './update-event/update-event.component';

@NgModule({
  declarations: [
    CreateEventComponent,
    EventDetailsComponent,
    EventsByCategoryComponent,
    GestioneventsComponent,
    ListeventsComponent,
    UpdateEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventsRoutingModule
  ]
})
export class EventsModule {}
