import { Component, OnInit } from "@angular/core";
import { Router } from "express";
import { Pedido } from "../../../Model/Domain/Pedido/PedidoClass";
import { Producto } from "../../../Model/Domain/Producto/ProductoClass";
import { CartService } from "../../../Service/carrito/CartService";
import { PedidoService } from "../../../Service/pedido/Pedido.service";

 
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  step: number = 1;
  shippingInfo: any = {};
  paymentMethod: string = '';
  cartItems: any[] = [];
  orderSummary: any = {};

  constructor(
    private cartService: CartService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateOrderSummary();
  }

  calculateOrderSummary() {
    const subtotal = this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    this.orderSummary = { subtotal, tax, total };
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  confirmOrder() {
    if (!this.shippingInfo.address || !this.paymentMethod) {
      // Podría mostrar un mensaje de error o prevenir continuar si no están estos datos
      return;
    }

    const productos: Producto[] = this.cartItems.map((item) => ({
      id: item.product.id,
      nombre: item.product.name,
      precio: item.product.price,
      cantidad: item.quantity,
    }));

    // Crear el pedido
    const pedido: Pedido = {
      id: 0, // El ID será generado por el backend
      fecha: new Date().toISOString(),
      cliente: { id: 1 },
      productos: productos,
      total: this.orderSummary.total,
      estado: 'Pendiente', // Estado inicial del pedido
      direccionEnvio: this.shippingInfo.address,
      metodoPago: this.paymentMethod,
    };

    // Llamar al servicio para agregar el pedido
    this.pedidoService.addPedido(pedido);
  }
}
