import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../../Model/Domain/Pedido/PedidoClass';
import { Producto } from '../../../Model/Domain/Producto/ProductoClass';
import { CartService } from '../../../Service/carrito/CartService';
import { PedidoService } from '../../../Service/pedido/Pedido.service';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { PedidoDetails } from '../../../Model/Domain/interface/PedidoDetails';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  shippingInfo: any = {};
  paymentMethod: string = '';
  cartItems: any[] = [];
  orderSummary: any = {};
  subtotal: number = 0;
  IVA: number = 0;
  total: number = 0;

  constructor(
    private pedidoService: PedidoService,
    private cartService: CartService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }
  calculateTotals() {
    this.subtotal = this.cartItems.reduce(
      (resultado, item) => resultado + item.product.precio * item.quantity,
      0
    );
    this.IVA = this.subtotal * 0.21;
    this.total = this.subtotal + this.IVA;
    this.orderSummary = {
      subtotal: this.subtotal,
      IVA: this.IVA,
      total: this.total,
    };
  }

  confirmOrder() {
    if (!this.shippingInfo.address || !this.paymentMethod) {
      console.error('Faltan datos de envío o método de pago');
      return;
    }
    if (!this.cartItems.length) {
      console.error('El carrito está vacío');
      return;
    }
    if (this.orderSummary.total <= 0) {
      console.error('El total del pedido no puede ser 0 o negativo');
      return;
    }

    const productosPedidos = this.cartItems.map((item) => ({
      producto: { id: item.product.id },
      cantidad: item.quantity,
    }));

    const fechaCreacion = new Date().toISOString();

    const clienteId = this.authService.getCurrentUserId();
    if (!clienteId) {
      console.error('Cliente no identificado');
      return;
    }

    const pedido: PedidoDetails = {
      fechaCreacion: new Date().toISOString(),
      estado: 'PENDIENTE',
      direccionEnvio: this.shippingInfo.address.trim(),
      metodoPago: this.paymentMethod.trim(),
      cliente: { id: clienteId },
      productos: this.cartItems.map((item) => ({
        producto: { id: item.product.id },
        cantidad: item.quantity,
      })),
      precio: this.orderSummary.total,
    };

 
    this.pedidoService.addPedido(pedido);
    this.cartService.clearCart();
    this.router.navigateByUrl('/productos');
  }
}
