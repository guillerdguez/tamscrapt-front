import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { LetteringHandler } from '../handler/LetteringHandler';
import { OfertasHandler } from '../handler/OfertasHandler';
import { ProductosHandler } from '../handler/ProductosHandler';
import { ScrapbookingHandler } from '../handler/ScrapbookingHandler';
import { UsersHandler } from '../handler/UsersHandler';
import { PedidosHandler } from '../handler/PedidosHandler';
import { PedidoHandler } from '../handler/PedidoHandler';
import { FavoritoHandler } from '../handler/FavoritoHandler';

@Injectable({
  providedIn: 'root',
})
export class TipoFactory {
  private handlerRegistry: { [key: string]: TipoHandler };

  constructor(
    productosHandler: ProductosHandler,
    scrapbookingHandler: ScrapbookingHandler,
    favoritoHandler: FavoritoHandler,
    letteringHandler: LetteringHandler,
    ofertasHandler: OfertasHandler,
    usersHandler: UsersHandler,
    pedidosHandler: PedidosHandler,
    pedidoHandler: PedidoHandler
  ) { 
    this.handlerRegistry = {
      productos: productosHandler,
      scrapbooking: scrapbookingHandler,
      favorito: favoritoHandler,
      lettering: letteringHandler,
      ofertas: ofertasHandler,
      users: usersHandler,
      pedidos: pedidosHandler,
      pedidosCliente: pedidoHandler,
    };
  }

  getHandler(tipo: string): TipoHandler | null { 
    return this.handlerRegistry[tipo] || null;
  }
} 