 
import { Injectable } from '@angular/core';
import { TipoManejador } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../producto/Producto.service';

@Injectable()
export class OfertasHandler implements TipoManejador {
  constructor(private productoService: ProductoService) {}

  ejecutar(): void {
    this.productoService.getProductos('ofertas');  
  }

  getTitulo(): string {
    return 'Ofertas';
  }
}
