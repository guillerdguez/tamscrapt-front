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
    // this.callbacksProductoService.alternarCart$.subscribe((selectedItems) => {
    //   this.alternarCart(selectedItems);
    // });
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.inicializarCart(userId); // Cargar el carrito desde la base de datos
    }
  }

  alternarCart(selectedItems: Producto[]): void {
    selectedItems.forEach((producto) => {
      this.addProductoCarrito(producto, 1);
    });
  }

  getCartItems(): { product: ProductoDetails; quantity: number }[] {
    if (this.cartItems.length === 0) {
      this.handleError('No tienes productos en el carrito');
    }
    return this.cartItems; // Devolver los ítems cargados desde la base de datos
  }
  //quitar el null
  // private inicializarCart(userId: number | undefined): void {
  //   this.cartDAO.getCarrito(userId).subscribe({
  //     next: (items) => {
  //       console.log(items);
  //       this.cartItems = items.map((item) => ({
  //         product: item.producto,
  //         quantity: item.cantidad,
  //       }));
  //       console.log('cartItems', this.cartItems);
  //       this.cartItemsSubject.next(this.cartItems);
  //     },
  //     error: (error) => {
  //       console.error('Error al cargar el carrito:', error);
  //     },
  //   });
  // }
  private inicializarCart(userId?: number): void {
    this.cartDAO.getCarrito(userId).subscribe({
      next: (response) => {
        if (response?.productos) {
          // Agrupar productos por su ID y sumar las cantidades
          const agrupados = response.productos.reduce((acc, item) => {
            const productoId = item.producto.id;
            if (!acc[productoId]) {
              acc[productoId] = {
                product: {
                  ...item.producto,
                  cantidad: item.cantidad,
                  imagen: item.producto['imagenes'] || [],
                } as ProductoDetails, // Aserción de tipo aquí
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
  //comprobar que se puede meter,al meterlo no quita del articulo,como podemos hacer que no pueda meter mas de los que hay entre su carrito y producto
  //si el tiene uno y 20 pone en la tienda,realmente quedarian 19 eligibles por esa persona
  //
  //
  addProductoCarrito(product: Producto, quantityToAdd: number = 1): void {
    if (product.cantidad <= 0 || product.cantidad < quantityToAdd) {
      this.messageService.add({
        severity: 'error',
        summary: 'Stock Insuficiente',
        detail: 'El producto no tiene stock disponible.',
      });
      return;
    }

    const articuloExistente = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    let finalQuantity = quantityToAdd;

    if (articuloExistente) {
      finalQuantity = articuloExistente.quantity + quantityToAdd;
    }

    this.cartDAO.addProductoCarrito(product.id, finalQuantity).subscribe({
      next: (resServidor) => {
        const { productId, quantity } = resServidor || {
          productId: product.id,
          quantity: finalQuantity,
        };

        if (articuloExistente) {
          articuloExistente.quantity = quantity;
          if (articuloExistente.quantity <= 0) {
            this.cartItems = this.cartItems.filter(
              (item) => item.product.id !== productId
            );
          }
        } else if (quantity > 0) {
          const productCopy: ProductoDetails = product.getProductoData();
          this.cartItems.push({ product: productCopy, quantity });
        }

         this.cartItemsSubject.next(this.cartItems);
      },
      error: (error) => {
        console.error('Error al agregar el producto al carrito:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el producto al carrito.',
        });
      },
    });
  }

  updateProductQuantity(productId: number, quantity: number): void {
    this.cartDAO.addProductoCarrito(productId, quantity).subscribe({
      next: () => {
        const item = this.cartItems.find(
          (item: any) => item.product.id === productId
        );

        if (item) {
          item.quantity = quantity;
          if (item.quantity <= 0) {
            this.removeProduct(productId);
          }
        }
        // if (item && quantity <= item.product.cantidad) {
        //   this.messageService.add({
        //     severity: 'error',
        //     summary: 'Error',
        //     detail: 'No hay suficiente stock.',
        //   });
        // }
        this.cartItemsSubject.next(this.cartItems);
      },
      error: (error) => {
        console.error('Error al actualizar la cantidad:', error);
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

  // este se usa al cambiar la cantidad en el carrito

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

  // saveCartItems(): void {
  //   console.warn(
  //     'La función saveCartItems ya no es necesaria y no realiza ninguna acción.'
  //   );
  // }
  // Mostrar mensaje de éxito
  private showSuccessMessage(detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
    });
  }

  // Manejo de errores
  private handleError(error: any): void {
    let detalleError = '';
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
