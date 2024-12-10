// cart.service.ts
import { Injectable } from '@angular/core';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { CallbacksProductoService } from '../Callbacks/CallbacksProductoService';
import { CarritoDAO } from '../../DAO/carrito.DAO';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProductoDetails } from '../../Model/Domain/interface/ProductoDetails';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';
  private cartItems: { product: ProductoDetails; quantity: number }[] = [];
  private cartItemsSubject = new BehaviorSubject(this.getCartItems());

  // Observable para los componentes
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(
    private callbacksProductoService: CallbacksProductoService,
    private cartDAO: CarritoDAO,
    private messageService: MessageService
  ) {
    console.log('CartService initialized');
    this.callbacksProductoService.toggleCart$.subscribe((selectedItems) => {
      console.log('toggleCart$ event received:', selectedItems);
      this.toggleCart(selectedItems);
    });
  }

  toggleCart(selectedItems: Producto[]): void {
    console.log('toggleCart method called with:', selectedItems);
    selectedItems.forEach((producto) => {
      this.addProductoCarrito(producto, 1);
    });
  }

  getCartItems(): { product: ProductoDetails; quantity: number }[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addProductoCarrito(product: Producto, quantity: number = 1): void {
    console.log('Adding product to cart:', product, 'Quantity:', quantity);
    this.cartDAO.addProductoCarrito(product.id, quantity).subscribe({
      next: (response) => {
        console.log('Product added to cart successfully:', response);
        const cartItems = this.getCartItems();
        const existingItem = cartItems.find(
          (item: any) => item.product.id === product.id
        );

        if (existingItem) {
          existingItem.quantity += quantity;
          if (existingItem.quantity <= 0) {
            this.removeProduct(product.id);
          }
        } else {
          // Crear una copia del producto sin referencias cíclicas
          const productCopy: ProductoDetails = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen,
            lettering: product.lettering,
            scrapbooking: product.scrapbooking,
            oferta: product.oferta,
            descuento: product.descuento,
            cantidad: product.cantidad,
            precioOriginal: product.precioOriginal,
          };
          cartItems.push({ product: productCopy, quantity });
        }

        this.saveCartItems(cartItems);
        this.cartItemsSubject.next(cartItems); // Notifica a los componentes suscritos

        // Mostrar mensaje de éxito
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `${product.nombre} agregado al carrito.`,
        });
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
    const cartItems = this.getCartItems();
    const item = cartItems.find((item: any) => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      } else {
        this.saveCartItems(cartItems);
        this.cartItemsSubject.next(cartItems);
      }
    }
  }

  removeProduct(productId: number): void {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter((item: any) => item.product.id !== productId);
    this.saveCartItems(cartItems);
    this.cartItemsSubject.next(cartItems); // Notifica cambios

    // Mostrar mensaje de eliminación
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Producto eliminado del carrito.',
    });
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }

  saveCartItems(cartItems: any[]): void {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }
}
