import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Producto } from './ProductoClass';
import { ProductoService } from '../../Service/Producto.service';
import { AlgoModel } from '../Views/Dynamic/AlgoModel';
import { ProductoModel } from '../Views/Dynamic/ProductoModel';
import { UserModel } from '../Views/Dynamic/UserModel';
import { User } from './User/UserClass';

export class Pedido {
  id!: number;
  precio: number = 0;
  fechaCreacion!: Date;
  cliente?: User;
  //   productos: Set<ProductosPedidos> = new Set();
  menuItems!: MenuItem[];

  constructor(
    public router: Router,
    public algoModel: AlgoModel,
    public productoModel: ProductoModel,
    public userModel: UserModel,
    public productoService: ProductoService
  ) {
    this.fechaCreacion = new Date();
    this.setMenuItems();
  }

  // Agrega un producto al pedido
  //   addProducto(producto: Producto, cantidad: number): void {
  //     const productoPedido = new ProductosPedidos(producto, this, cantidad);
  //     if (this.productos.has(productoPedido)) {
  //       this.productos.delete(productoPedido);
  //     }
  //     if (cantidad !== 0) {
  //       this.productos.add(productoPedido);
  //     }
  //     producto.pedidos?.push(productoPedido);
  //     this.calcularPrecio();
  //   }

  //   // Elimina un producto del pedido
  //   removeProducto(producto: Producto): void {
  //     this.productos.forEach((productoPedido) => {
  //       if (productoPedido.producto.id === producto.id) {
  //         this.productos.delete(productoPedido);
  //         productoPedido.producto.pedidos =
  //           productoPedido.producto.pedidos?.filter((p) => p !== productoPedido);
  //         productoPedido.pedido = undefined;
  //         productoPedido.cantidad = 0;
  //       }
  //     });
  //     this.calcularPrecio();
  //   }

  //   // Calcula el precio total del pedido
  //   calcularPrecio(): void {
  //     let total = 0;
  //     this.productos.forEach((productoPedido) => {
  //       total += productoPedido.producto.precio * productoPedido.cantidad;
  //     });
  //     this.precio = total;
  //   }

  //   // Obtiene una descripción detallada del pedido
  //   imprimirProductos(): string {
  //     let resultado = `Productos del pedido ${this.id}\n`;

  //     if (this.productos.size === 0) {
  //       resultado += 'No hay productos en este pedido.';
  //     } else {
  //       this.productos.forEach((productoPedido) => {
  //         const producto = productoPedido.producto;
  //         const cantidad = productoPedido.cantidad;
  //         resultado += `${
  //           producto.nombre
  //         } ---> Cantidad: ${cantidad} | Precio Unitario: ${
  //           producto.precio
  //         } € | Total: ${producto.precio * cantidad} €\n`;
  //       });
  //     }

  //     return resultado;
  //   }

  // Configura los elementos del menú
  setMenuItems(): void {
    this.menuItems = this.userModel.admin
      ? this.getMenuItemOptionsAdmin()
      : this.getMenuItemOptionsUser();
  }

  getMenuItemOptionsAdmin(): MenuItem[] {
    return [
      {
        label: 'Crear Pedido',
        icon: 'pi pi-plus',
        command: () => this.router.navigate(['/newPedido']),
      },
      {
        label: 'Eliminar Pedido',
        icon: 'pi pi-trash',
        command: () => this.delete(),
      },
      {
        label: 'Editar Pedido',
        icon: 'pi pi-file-edit',
        command: () => this.router.navigate(['/detail/Pedidos/', this.id]),
      },
    ];
  }

  getMenuItemOptionsUser(): MenuItem[] {
    return [
      {
        label: 'Ver Pedido',
        icon: 'pi pi-eye',
        command: () => this.router.navigate(['/detail/Pedidos/', this.id]),
      },
      {
        label: 'Confirmar Pedido',
        icon: 'pi pi-check',
        command: () => this.confirmarPedido(),
      },
    ];
  }

  delete(): void {
    // Lógica para eliminar el pedido
    console.log(`Eliminando pedido con ID: ${this.id}`);
  }

  confirmarPedido(): void {
    // Lógica para confirmar el pedido
    console.log(`Confirmando pedido con ID: ${this.id}`);
  }
}
