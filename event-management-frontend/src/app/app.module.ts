import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';

// Importation des modules fonctionnels
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AppRoutingModule,
    EventsModule,       // ✅ EventsModule gère ses composants
    CategoriesModule    // ✅ CategoriesModule gère les siens
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
