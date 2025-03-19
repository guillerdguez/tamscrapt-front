import { Injectable } from '@angular/core';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { CarritoDAO } from '../../DAO/carrito.DAO';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProductoDetails } from '../../Model/Domain/interface/ProductoDetails';
import { AuthService } from '../seguridad/AuthService.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';
  private cartItems: { product: ProductoDetails; quantity: number }[] = [];
  private cartItemsSubject = new BehaviorSubject(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(
    private cartDAO: CarritoDAO,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.inicializarCart(userId);
    }
  }

  alternarCart(selectedItems: Producto[]): void {
    selectedItems.forEach((producto) => {
      this.agregarOActualizarProductoCarrito(producto, 1, false);
    });
  }

  getCartItems(): { product: ProductoDetails; quantity: number }[] {
    if (this.cartItems.length === 0) {
      this.handleError('No tienes productos en el carrito');
    }
    return this.cartItems;
  }

  private inicializarCart(userId?: number): void {
    this.cartDAO.getCarrito(userId).subscribe({
      next: (response) => {
        if (response?.productos) {
          response.productos.forEach((item) => {
            if (item.producto['cantidad'] == 0) {
              this.removeProduct(item.producto.id);
              this.handleError(`Se acabo el producto ${item.producto.nombre}`);
            }
          });
          const agrupados = response.productos.reduce((acc, item) => {
            const productoId = item.producto.id;
            if (!acc[productoId]) {
              acc[productoId] = {
                product: {
                  ...item.producto,
                  cantidad: item.cantidad,
                  imagen: item.producto['imagenes'] || [],
                } as ProductoDetails,
                quantity: item.cantidad,
              };
            } else {
              acc[productoId].quantity += item.cantidad;
              acc[productoId].product.cantidad += item.cantidad;
            }
            return acc;
          }, {} as { [key: number]: { product: ProductoDetails; quantity: number } });

          this.cartItems = Object.values(agrupados);
          this.cartItemsSubject.next(this.cartItems);
        } else {
          this.cartItems = [];
          this.cartItemsSubject.next(this.cartItems);
        }
      },
      error: (error) => console.error('Error al cargar el carrito:', error),
    });
  }

  agregarOActualizarProductoCarrito(
    producto: Producto,
    cantidadAgregada: number = 1,
    esActualizacion: boolean = false
  ): void {
    const articuloExistente = this.cartItems.find(
      (item) => item.product.id === producto.id
    );

    let cantidadFinal = cantidadAgregada;
    if (!esActualizacion && articuloExistente) {
      cantidadFinal = articuloExistente.quantity + cantidadAgregada;
    }

    if (producto.cantidad <= 0 || producto.cantidad < cantidadFinal) {
      this.messageService.add({
        severity: 'error',
        summary: 'Cantidad Insuficiente',
        detail: esActualizacion
          ? 'El producto no tiene suficiente cantidad, pondremos el máximo disponible.'
          : 'El producto no tiene suficiente cantidad disponible.',
      });
      return;
    }

    this.cartDAO.addProductoCarrito(producto.id, cantidadFinal).subscribe({
      next: (resServidor) => {
        const { productId, quantity: cantidadActualizada } = resServidor || {
          productId: producto.id,
          quantity: cantidadFinal,
        };

        if (articuloExistente) {
          articuloExistente.quantity = cantidadActualizada;
          if (articuloExistente.quantity <= 0) {
            this.cartItems = this.cartItems.filter(
              (item) => item.product.id !== productId
            );
          }
        } else {
          if (cantidadActualizada > 0) {
            const copiaProducto: ProductoDetails = producto.getProductoData();
            this.cartItems.push({
              product: copiaProducto,
              quantity: cantidadActualizada,
            });
          }
        }

        this.cartItemsSubject.next(this.cartItems);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo completar la operación en el carrito.',
        });
      },
    });
  }

  removeProduct(productId: number): void {
    this.cartDAO.deleteCarrito(productId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(
          (item: any) => item.product.id !== productId
        );
        this.cartItemsSubject.next(this.cartItems);
      },
      error: (error) => {
        console.error('Error al eliminar el producto del carrito:', error);
      },
    });
  }

 
  clearCart(): void {
    this.cartDAO.clearCart().subscribe({
      next: () => {
        this.cartItems = [];
        this.cartItemsSubject.next(this.cartItems);
      },
      error: (error) => {
        console.error('Error al vaciar el carrito:', error);
      },
    });
  }
 //no se usa
  private showSuccessMessage(detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
    });
  }
 

  private handleError(error: any): void {
    let detalleError = error;
    if (error.status === 500) {
      detalleError =
        'Error del servidor. Por favor, verifica los logs del backend o intenta nuevamente más tarde.';
    } else if (error.status === 400) {
      detalleError =
        'Error en la solicitud. Por favor, revisa los datos enviados.';
    } else if (error.status) {
      detalleError = `Ocurrió un error inesperado. Código de estado: ${error.status}.`;
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detalleError,
    });
  }
}
