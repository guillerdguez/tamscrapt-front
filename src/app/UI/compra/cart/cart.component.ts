import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../Service/carrito/CartService';
import { AuthService } from '../../../Service/seguridad/AuthService.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;
  IVA: number = 0;
  total: number = 0;
  activo: boolean = this.cartItems.length === 0;
  cantidad: number = 1;

  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotals();
      this.activo = this.cartItems.length === 0;
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (resultado, item) => resultado + item.product.precio * item.quantity,
      0
    );
    this.IVA = this.subtotal * 0.21;
    this.total = this.subtotal + this.IVA;
  }

  updateQuantity(item: any, quantity: number): void {
    if (quantity === 0 || quantity === undefined) {
      this.removeItem(item);
    } else {
      this.cartService.agregarOActualizarProductoCarrito(
        item.product,
        quantity,
        true
      );
    }
  }

  removeItem(item: any): void {
    this.cartService.removeProduct(item.product.id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
