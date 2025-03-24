import { Injectable } from '@angular/core';
import { TipoManejador } from '../../Model/Domain/interface/TipoHandler';
import { Router } from '@angular/router';
import { AuthService } from '../seguridad/AuthService.service';
import { UserService } from '../user/User.service';
import { ProductoService } from '../producto/Producto.service';

@Injectable()
export class FavoritoHandler implements TipoManejador {
  constructor(
    private router: Router,
     private productService: ProductoService,
    public authService: AuthService
  ) {}

  ejecutar(): void {
    if (this.authService.getCurrentUserId()) {
      this.productService.cargarFavoritos(this.authService.getCurrentUserId());
    } else {
      this.router.navigate(['login']);
    }
  }

  getTitulo(): string {
    return 'Favoritos';
  }
}
