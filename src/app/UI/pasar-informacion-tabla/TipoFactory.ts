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
  private handlerRegistry: { [key: string]: () => TipoHandler };

  constructor(
    private productosHandler: ProductosHandler,
    private scrapbookingHandler: ScrapbookingHandler,
    private letteringHandler: LetteringHandler,
    private ofertasHandler: OfertasHandler,
    private usersHandler: UsersHandler
  ) {
    // Registrar los manejadores en un objeto
    this.handlerRegistry = {
      productos: () => this.productosHandler,
      scrapbooking: () => this.scrapbookingHandler,
      lettering: () => this.letteringHandler,
      ofertas: () => this.ofertasHandler,
      users: () => this.usersHandler,
    };
  }

  getHandler(tipo: string): TipoHandler | null {
    // Usar el registro para obtener el handler correspondiente
    const handlerFactory = this.handlerRegistry[tipo];
    return handlerFactory ? handlerFactory() : null;
  }
}
