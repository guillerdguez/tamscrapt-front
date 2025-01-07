import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { UserAuthority } from '../../../Model/Domain/User/UserAuthority.enum';
import { UserService } from '../../../Service/user/User.service';
import { GenericModel } from '../../../Model/Views/Dynamic/GenericModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dropdownMenu: boolean = false;
  menuOpen: boolean = false;
  userId: number | undefined = undefined;
  userAuthority = UserAuthority;

  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UserService,
    public genericModel: GenericModel
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario actual al inicializar el componente
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      this.userService.getUser(this.userId);
    }
  }

  // Alterna entre los menús desplegables
  toggleMenu(menu: 'admin' | 'user') {
    if (menu === 'admin') {
      this.dropdownMenu = !this.dropdownMenu;
      this.menuOpen = false;
    } else if (menu === 'user') {
      this.menuOpen = !this.menuOpen;
      this.dropdownMenu = false;
    }
  }

  closeMenus() {
    this.dropdownMenu = false;
    this.menuOpen = false;
  }

  logout() {
    // window.location.reload();
    this.authService.logout();
    // this.router.navigate(['/home']);
  }
}
