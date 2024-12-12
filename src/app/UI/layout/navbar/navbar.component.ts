import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { UserAuthority } from '../../../Model/Domain/User/UserAuthority.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dropdownMenu: boolean = false;
  menuOpen: boolean = false;
  userId: number | undefined = undefined;
  userAuthority = UserAuthority; // Exponer el enum para la plantilla

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Obtener el ID del usuario actual al inicializar el componente
    this.userId = this.authService.getCurrentUserId();
  }

  toggleMenu() {
    this.dropdownMenu = !this.dropdownMenu;
    if (this.dropdownMenu) this.menuOpen = false;
  }

  toggleUserMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) this.dropdownMenu = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
