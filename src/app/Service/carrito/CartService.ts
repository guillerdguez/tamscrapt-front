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

    this.initializeCart(userId); // Cargar el carrito desde la base de datos
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
  private initializeCart(userId: number | undefined): void {
    this.cartDAO.getCarrito(userId).subscribe({
      next: (items) => {
        this.cartItems = items.map((item) => ({
          product: item.producto,
          quantity: item.cantidad,
        }));
        this.cartItemsSubject.next(this.cartItems);
      },
      error: (error) => {
        console.error('Error al cargar el carrito:', error);
      },
    });
  }

  addProductoCarrito(product: Producto, quantity: number = 1): void {
    this.cartDAO.addProductoCarrito(product.id, quantity).subscribe({
      next: () => {
        const existingItem = this.cartItems.find(
          (item: any) => item.product.id === product.id
        );

        if (existingItem) {
          existingItem.quantity += quantity;
          if (existingItem.quantity <= 0) {
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

  // saveCartItems(): void {
  //   console.warn(
  //     'La función saveCartItems ya no es necesaria y no realiza ninguna acción.'
  //   );
  // }
}
