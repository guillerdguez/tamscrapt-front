import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { UserModel } from '../../../Model/Views/Dynamic/UserModel';
import { UserService } from '../../../Service/user/User.service';
import { UserDetails } from '../../../Model/Domain/interface/UserDetails';
import { UserAuthority } from '../../../Model/Domain/User/UserAuthority.enum';
import { Location } from '@angular/common';
import { AuthService } from '../../../Service/seguridad/AuthService.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [DialogService],
})
export class FormularioComponentUser implements OnInit {
  nombre: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  imagen: string = '';
  authorities: UserAuthority[] = [];
  selectedAuthority: UserAuthority = UserAuthority.USER;
  userAuthority = UserAuthority;

  constructor(
    private userService: UserService,
    public userModel: UserModel,
    private router: Router,
    private location: Location,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authorities = Object.values(UserAuthority).filter(
      (authority) => authority !== UserAuthority.ANONYMOUS
    );
  }

  add(
    nombre: string,
    username: string,
    password: string,
    email: string,
    imagen: string,
    authorities: UserAuthority[]
  ): void {
    nombre = nombre.trim();

    if (!nombre || !username || !password || !email) {
      return;
    }

    const newUser: UserDetails = {
      nombre,
      username,
      password,
      email,
      imagen,
      authorities: [this.selectedAuthority],
    };
    this.userService.addUser(newUser);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }
}
