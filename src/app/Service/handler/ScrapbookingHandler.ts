import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../Producto.service';
@Injectable()
export class ScrapbookingHandler implements TipoHandler {
  constructor(private productoService: ProductoService) {}

  execute(): void {
    this.productoService.getProductosScrapbooking();
  }

  getTitle(): string {
    return 'Scrapbooking';
  }
  
}
