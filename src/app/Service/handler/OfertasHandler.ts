import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../Producto.service';

@Injectable()
export class OfertasHandler implements TipoHandler {
  constructor(private productoService: ProductoService) {}

  execute(): void {
    this.productoService.getProductosOferta();
  }

  getTitle(): string {
    return 'Ofertas';
  }
  
}
