import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../../Service/pedido/Pedido.service';
import { CartService } from '../../../Service/carrito/CartService';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { PedidoDetails } from '../../../Model/Domain/interface/PedidoDetails';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  shippingInfo: { nombreComprador: string; address: string } = {
    nombreComprador: '',
    address: '',
  };
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
    if (!this.cartItems.length) {
      console.error('El carrito está vacío');
      return;
    }
    if (
      !this.shippingInfo.address ||
      !this.paymentMethod ||
      !this.shippingInfo.nombreComprador
    ) {
      console.error('Faltan datos');
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

    const clienteId = this.authService.getCurrentUserId();
    if (!clienteId) {
      console.error('Cliente no identificado');
      return;
    }

    const pedido: PedidoDetails = {
      fechaCreacion: new Date().toISOString(),
      estado: 'PENDIENTE',
      nombreComprador: this.shippingInfo.nombreComprador.trim(),
      direccionEnvio: this.shippingInfo.address.trim(),
      metodoPago: this.paymentMethod.trim(),
      cliente: { id: clienteId },
      productos: productosPedidos,
      precio: this.orderSummary.total,
    };

    this.pedidoService.addPedido(pedido);
    this.cartService.clearCart();
    this.router.navigateByUrl('/home');
  }
}
