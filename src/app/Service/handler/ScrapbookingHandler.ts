 
import { Injectable } from '@angular/core';
import { TipoManejador } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../producto/Producto.service';

@Injectable()
export class ScrapbookingHandler implements TipoManejador {
  constructor(private productoService: ProductoService) {}

  ejecutar(): void {
    this.productoService.getProductos('scrapbooking'); 
  }

  getTitulo(): string {
    return 'Scrapbooking';
  }
}
