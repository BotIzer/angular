import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Dolgozok',
      icon: 'pi pi-fw pi-users',
      routerLink: '/employees'
    },
    {
      label: 'Kartyaolvasok',
      icon:'pi pi-fw pi-cog',
      routerLink: '/readers'
    },
    {
      label: 'Kártyahasználat',
      icon:'pi pi-fw pi-calendar',
      routerLink: '/usages'
    },
    {
      label: 'Bejelentkezés',
      icon: 'pi pi-fw pi-user',
      routerLink: '/login',
      id: 'login-menu-item'
    },
    {
      label: '...',
      icon: 'pi pi-fw pi-user',
      id: 'logged-user-menu-item',
      items: [{
        label: 'Kijelentkezés',
        command: () => this.httpservice.logout()
      }]
    }
  ]
  constructor(private httpservice: HttpService) {}

  ngOnInit(): void {
    this.httpservice.loggedStatusChanged.subscribe({
      next: () => {
        const loginMenuItem = this.menuItems.filter(m => m.id == 'login-menu-item')[0]
        const loggedUserMenuItem = this.menuItems.filter(m => m.id == 'logged-user-menu-item')[0]
        loggedUserMenuItem.visible = this.httpservice.userData.token ? true : false
        loginMenuItem.visible = !loggedUserMenuItem.visible;
        loggedUserMenuItem.label = this.httpservice.userData.name;
      }
    });
    this.httpservice.checkUserData();
  }
}
