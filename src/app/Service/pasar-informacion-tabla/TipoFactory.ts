import { Injectable } from '@angular/core';
import { TipoManejador } from '../../Model/Domain/interface/TipoHandler';
import { LetteringHandler as LetteringManejador } from '../handler/LetteringHandler';
import { OfertasHandler as OfertasManejador } from '../handler/OfertasHandler';
import { ProductosHandler as ProductosManejador } from '../handler/ProductosHandler';
import { ScrapbookingHandler as ScrapbookingManejador } from '../handler/ScrapbookingHandler';
import { UsersHandler as UsersManejador } from '../handler/UsersHandler';
import { PedidosHandler as PedidosManejador } from '../handler/PedidosHandler';
import { PedidoHandler as PedidoManejador } from '../handler/PedidoHandler';
import { FavoritoHandler as FavoritoManejador } from '../handler/FavoritoHandler';

@Injectable({
  providedIn: 'root',
})
export class TipoFactory {
  private manejadorRegistry: { [key: string]: TipoManejador };

  constructor(
    productosManejador: ProductosManejador,
    scrapbookingManejador: ScrapbookingManejador,
    favoritoManejador: FavoritoManejador,
    letteringManejador: LetteringManejador,
    ofertasManejador: OfertasManejador,
    usersManejador: UsersManejador,
    pedidosManejador: PedidosManejador,
    pedidoManejador: PedidoManejador
  ) { 
    this.manejadorRegistry = {
      productos: productosManejador,
      scrapbooking: scrapbookingManejador,
      favorito: favoritoManejador,
      lettering: letteringManejador,
      ofertas: ofertasManejador,
      users: usersManejador,
      pedidos: pedidosManejador,
      pedidosCliente: pedidoManejador,
    };
  }

  getManejador(tipo: string): TipoManejador | null { 
    return this.manejadorRegistry[tipo] || null;
  }
} 











