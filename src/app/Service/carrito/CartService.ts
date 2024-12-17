import { Injectable } from '@angular/core';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { CallbacksProductoService } from '../Callbacks/CallbacksProductoService';
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
    private callbacksProductoService: CallbacksProductoService,
    private cartDAO: CarritoDAO,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.callbacksProductoService.toggleCart$.subscribe((selectedItems) => {
      this.toggleCart(selectedItems);
    });
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.initializeCart(userId); // Cargar el carrito desde la base de datos
    }
  }

  toggleCart(selectedItems: Producto[]): void {
    selectedItems.forEach((producto) => {
      this.addProductoCarrito(producto, 1);
    });
  }

  getCartItems(): { product: ProductoDetails; quantity: number }[] {
    return this.cartItems; // Devolver los ítems cargados desde la base de datos
  }
  //quitar el null
  // private initializeCart(userId: number | undefined): void {
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
  private initializeCart(userId?: number): void {
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
  addProductoCarrito(product: Producto, quantity: number = 1): void {
    this.cartDAO.addProductoCarrito(product.id, quantity).subscribe({
      next: () => {
        let articuloExistente;
        if (this.cartItems.length > 0) {
          articuloExistente = this.cartItems.find(
            (item: any) => item.product.id === product.id
          );
        }

        if (articuloExistente) {
          articuloExistente.quantity += quantity;
          if (articuloExistente.quantity <= 0) {
            this.removeProduct(product.id);
          }
        } else {
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
  updateProductQuantity(productId: number, quantity: number): void {
    this.cartDAO.updateCarrito(productId, { cantidad: quantity }).subscribe({
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

        this.cartItemsSubject.next(this.cartItems);
      },
      error: (error) => {
        console.error('Error al actualizar la cantidad:', error);
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

  // saveCartItems(): void {
  //   console.warn(
  //     'La función saveCartItems ya no es necesaria y no realiza ninguna acción.'
  //   );
  // }
}
