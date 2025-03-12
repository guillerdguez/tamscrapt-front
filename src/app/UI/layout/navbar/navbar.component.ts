import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { UserAuthority } from '../../../Model/Domain/User/UserAuthority.enum';
import { UserService } from '../../../Service/user/User.service';
import { GenericModel } from '../../../Model/Views/Dynamic/GenericModel';
import { UserModel } from '../../../Model/Views/Dynamic/UserModel';

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
    private userService: UserService,
    public genericModel: GenericModel,
    public userModel: UserModel
  ) {}

  ngOnInit(): void { 
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      this.userService.getUser(this.userId);
    }
  }
 
  alternarMenu(menu: 'admin' | 'user') {
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
