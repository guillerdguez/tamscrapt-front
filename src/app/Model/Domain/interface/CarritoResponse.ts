export interface CarritoResponse {
  id: number;
  nombreCliente: string;
  productos: {
    cantidad: number;
    producto: {
      id: number;
      nombre: string;
      precio: number;
      [key: string]: any;
    };
    productoId: number;
  }[];
}
