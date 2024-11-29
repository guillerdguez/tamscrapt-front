import { Component } from '@angular/core';
import { UserModel } from '../../../Model/Views/Dynamic/UserModel';
import { User } from '../../../Model/Domain/User/UserClass';
import { AuthService } from '../../../Service/AuthService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  dropdownMenu: boolean = false; // Estado del menú de administración
  menuOpen: boolean = false; // Estado del menú de usuario

  constructor(public user: AuthService) {}

  toggleMenu() {
    // Al abrir/cerrar el menú de administración, aseguramos que el menú de usuario se cierre
    this.dropdownMenu = !this.dropdownMenu;
    if (this.dropdownMenu) {
      this.menuOpen = false; // Cerrar menú de usuario si el menú de administración se abre
    }
  }

  toggleUserMenu() {
    // Al abrir/cerrar el menú de usuario, aseguramos que el menú de administración se cierre
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownMenu = false; // Cerrar menú de administración si el menú de usuario se abre
    }
  }

  ngOnInit() {
    // Aquí podrías realizar otras inicializaciones necesarias para el componente
  }
}
