import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dropdownMenu: boolean = false;

  toggleMenu() {
    this.dropdownMenu = !this.dropdownMenu;
  }
}
