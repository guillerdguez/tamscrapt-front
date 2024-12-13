import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserModel } from '../../../Model/Views/Dynamic/UserModel';
import { UserService } from '../../../Service/user/User.service';
import { UserDetails } from '../../../Model/Domain/interface/UserDetails';
import { Producto } from '../../../Model/Domain/Producto/ProductoClass';
import { UserAuthority } from '../../../Model/Domain/User/UserAuthority.enum';
import { Location } from '@angular/common';

//si tiene descuento automaticamente esta en
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [DialogService],
})
export class FormularioComponentUser implements OnInit {
  nombre: string = '';
  precio: number = 0;
  imagen: string = '';
  descuento: number = 0;
  lettering?: boolean;
  scrapbooking?: boolean;
  oferta?: boolean;
  ref?: DynamicDialogRef;
  cantidad: number = 1;

  constructor(
    private userService: UserService,
    public userModel: UserModel,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}
  add(
    nombre: string,
    username: string,
    email: string,
    authorities: UserAuthority[],
    favorito?: Producto[]
  ): void {
    nombre = nombre.trim();

    if (!nombre) {
      return;
    }

    const newUser: UserDetails = {
      nombre,
      username,
      email,
      authorities,
      favorito,
    };
    this.userService.addUser(newUser);

    this.goBack();
  }
  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }
 
}
