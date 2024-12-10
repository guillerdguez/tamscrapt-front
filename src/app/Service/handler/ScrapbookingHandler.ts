// ScrapbookingHandler.ts
import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../producto/Producto.service';

@Injectable()
export class ScrapbookingHandler implements TipoHandler {
  constructor(private productoService: ProductoService) {}

  execute(): void {
    this.productoService.getProductos('scrapbooking'); 
  }

  getTitle(): string {
    return 'Scrapbooking';
  }
}
