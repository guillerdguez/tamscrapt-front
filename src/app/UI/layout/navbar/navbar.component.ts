import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  dropdownMenu: boolean = false;

  toggleMenu() {
    this.dropdownMenu = !this.dropdownMenu;
  }
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/login',
      },
      {
        label: 'Sign Up',
        icon: 'pi pi-user-plus',
        routerLink: '/register',
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/profile',
      },
    ];
  }
}
