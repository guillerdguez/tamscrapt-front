import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { LetteringHandler } from '../../Service/handler/LetteringHandler';
import { OfertasHandler } from '../../Service/handler/OfertasHandler';
import { ProductosHandler } from '../../Service/handler/ProductosHandler';
import { ScrapbookingHandler } from '../../Service/handler/ScrapbookingHandler';
import { UsersHandler } from '../../Service/handler/UsersHandler';

@Injectable({
  providedIn: 'root',
})
export class TipoFactory {
  constructor(
    private productosHandler: ProductosHandler,
    private scrapbookingHandler: ScrapbookingHandler,
    private letteringHandler: LetteringHandler,
    private ofertasHandler: OfertasHandler,
    private usersHandler: UsersHandler
  ) {}

  getHandler(tipo: string): TipoHandler | null {
    switch (tipo) {
      case 'productos':
        return this.productosHandler;
      case 'scrapbooking':
        return this.scrapbookingHandler;
      case 'lettering':
        return this.letteringHandler;
      case 'ofertas':
        return this.ofertasHandler;
      case 'users':
        return this.usersHandler;
      default:
        return null;
    }
  }
}
