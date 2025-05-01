import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service'; // 👈 Importer
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private userService: UserService // 👈 Ajouter ici
  ) {}

  ngOnInit(): void {
    this.loadPieChart();
    this.loadUserRoleChart(); // 👈 Appeler le 2e chart
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
}
