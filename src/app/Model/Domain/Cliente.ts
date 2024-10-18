import { Pedido } from './Pedido';
import { UserAuthority } from './UserAuthority.enum';

export interface Cliente {
    id: number;  // Cambiado de opcional a requerido
    username: string;
    password: string; // Considera almacenar un hash en vez de texto plano
    email: string;
    authorities: UserAuthority[];
    pedidos: Set<Pedido>;

    // Métodos para manipular pedidos
    addPedido(pedido: Pedido): void;
    removePedido(pedido: Pedido): void;

    // Método de comparación
    equals(other: Cliente): boolean;
}
