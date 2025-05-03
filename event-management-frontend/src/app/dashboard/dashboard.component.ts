import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service'; // 👈 Importer
import { Chart } from 'chart.js/auto';

import dayGridPlugin from '@fullcalendar/daygrid';  // Plugin pour la vue calendrier du mois
import interactionPlugin from '@fullcalendar/interaction';  // Plugin pour l'interaction avec le calendrier

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  calendarOptions: any = {};  // Options pour FullCalendar

  constructor(
    private eventService: EventService,
    private userService: UserService // 👈 Ajouter ici
  ) {}

  ngOnInit(): void {
    this.loadPieChart();
    this.loadUserRoleChart(); // 👈 Appeler le 2e chart
    this.loadEventsForCalendar();  // Charger les événements pour le calendrier
  }

  loadPieChart(): void {
    this.eventService.countEventsByCategories().subscribe(data => {
      const categories = Object.keys(data);
      const counts = Object.values(data);

      new Chart('eventCategoryPieChart', {
        type: 'pie',
        data: {
          labels: categories,
          datasets: [{
            label: 'Événements par catégorie',
            data: counts,
            backgroundColor: [
              '#42A5F5', '#66BB6A', '#FFA726',
              '#AB47BC', '#EC407A', '#FF7043'
            ],
            borderColor: '#ffffff',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    });
  }

  loadUserRoleChart(): void {
    this.userService.countUsersByRole().subscribe(data => {
      const roles = Object.keys(data);
      const counts = Object.values(data);

      new Chart('userRoleBarChart', {
        type: 'bar',
        data: {
          labels: roles,
          datasets: [{
            label: 'Utilisateurs par rôle',
            data: counts,
            backgroundColor: '#26C6DA',
            borderColor: '#00ACC1',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  loadEventsForCalendar(): void {
    this.eventService.getAllEvents().subscribe(events => {
      // Transforme les événements en un format adapté à FullCalendar
      const calendarEvents = events.map(event => ({
        title: event.name,  // Assurez-vous que le nom de l'événement est bien dans `event.name`
        start: event.date,  // Date de l'événement, assurez-vous que la date est au format attendu
      }));

      this.calendarOptions = {
        initialView: 'dayGridMonth',  // Affichage du calendrier mensuel
        plugins: [dayGridPlugin, interactionPlugin],  // Plugins FullCalendar
        events: calendarEvents,  // Utilisation des événements récupérés
        eventClick: this.handleEventClick
      };
    });
  }

  handleEventClick(eventClickInfo: any): void {
    const event = eventClickInfo.event;
    alert(`Événement: ${event.title}\nDate: ${event.start}`);
  }
}
