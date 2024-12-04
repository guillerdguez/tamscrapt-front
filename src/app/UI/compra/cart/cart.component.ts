import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../Service/carrito/CartService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    this.tax = this.subtotal * 0.15; // Suponiendo un impuesto del 15%
    this.total = this.subtotal + this.tax;
  }

  updateQuantity(item: any, quantity: number) {
    // this.cartService.updateProductQuantity(item.product.id, quantity);
    this.loadCart();
  }

  removeItem(item: any) {
    this.cartService.removeProduct(item.product.id);
    this.loadCart();
  }
}
