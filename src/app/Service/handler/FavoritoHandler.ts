import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { Router } from '@angular/router';
import { AuthService } from '../seguridad/AuthService.service';
import { UserService } from '../user/User.service';
import { ProductoService } from '../producto/Producto.service';

@Injectable()
export class FavoritoHandler implements TipoHandler {
  constructor(
    private router: Router,
    private userService: UserService,
    private productService: ProductoService,
    public authService: AuthService
  ) {}

  execute(): void {
    if (this.authService.getCurrentUserId()) {
      this.productService.cargarFavoritos(this.authService.getCurrentUserId());
    } else {
      this.router.navigate(['login']);
    }
  }

  getTitle(): string {
    return 'Favoritos';
  }
}
