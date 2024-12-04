import { Injectable } from '@angular/core';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartKey = 'cartItems';

  constructor() {}

  getCartItems() {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addProduct(product: Producto, quantity: number) {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(
      (item: any) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ product, quantity });
    }
    this.saveCartItems(cartItems);
  }

  updateProductQuantity(productId: number, quantity: number) {
    const cartItems = this.getCartItems();
    const item = cartItems.find((item: any) => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      } else {
        this.saveCartItems(cartItems);
      }
    }
  }

  removeProduct(productId: number) {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter((item: any) => item.product.id !== productId);
    this.saveCartItems(cartItems);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  saveCartItems(cartItems: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }
}
