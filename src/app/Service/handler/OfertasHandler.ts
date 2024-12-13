 
import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../producto/Producto.service';

@Injectable()
export class OfertasHandler implements TipoHandler {
  constructor(private productoService: ProductoService) {}

  execute(): void {
    this.productoService.getProductos('ofertas');  
  }

  getTitle(): string {
    return 'Ofertas';
  }
}
