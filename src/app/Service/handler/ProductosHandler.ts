import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../Producto.service';

@Injectable()
export class ProductosHandler implements TipoHandler {
  constructor(private productoService: ProductoService) {}

  execute(): void {
    this.productoService.getProductosArray();
  }

  getTitle(): string {
    return 'Productos';
  }
  getContextType(): string {
    return 'producto';
  }
}
