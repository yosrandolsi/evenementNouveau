import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'event-management-frontend';
  showSidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;

      // Le sidebar ne s'affiche PAS si on est sur /login ou /register (user)
      // Il s'affiche pour tout le reste, y compris les routes dynamiques comme /register-event/:eventId/:categoryId
      this.showSidebar = !currentRoute.startsWith('/user/login') && !currentRoute.startsWith('/user/register');
    });
  }
}
