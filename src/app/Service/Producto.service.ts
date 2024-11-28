import { Injectable } from '@angular/core';
import { ProductoDAO } from '../DAO/producto.DAO';
import { AlgoModel } from '../Model/Views/Dynamic/AlgoModel';
import { Producto } from '../Model/Domain/ProductoClass';
import { BehaviorSubject } from 'rxjs';
import { ProductoModel } from '../Model/Views/Dynamic/ProductoModel';
import { CallbacksService } from './CallbacksService';
import { Router } from '@angular/router';
import { copyFileSync } from 'fs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  public productos$ = this.productosSubject.asObservable();
  private productos: Producto[] = [];

  constructor(
    private productoDAO: ProductoDAO,
    private algoModel: AlgoModel,
    public productoModel: ProductoModel,
    private callbacksService: CallbacksService,
    private router: Router
  ) {
    // Suscribirse a los eventos emitidos por CallbacksService

    this.callbacksService.deleteProductos$.subscribe((selectedItems) => {
      this.deleteMultipleProductos(selectedItems);
    });

    this.callbacksService.toggleOferta$.subscribe((selectedItems) => {
      this.toggleOferta(selectedItems);
    });

    this.callbacksService.toggleFavorito$.subscribe((selectedItems) => {
      this.toggleFavorito(selectedItems);
    });
  }

  // Implementación de los métodos suscritos

  deleteMultipleProductos(selectedItems: any[]) {
    selectedItems.forEach((item) => this.deleteProducto(item.id));
  }
  //cambia lo que muestra,boton no permite editar barios,acortar y necesita uno para
  toggleOferta(selectedItems: Producto[]) {
    console.log('Inicio de toggleOferta');
    console.log(
      'Cantidad de elementos en selectedItems:',
      selectedItems.length
    );

    const items = [...selectedItems]; // Copia del arreglo para evitar mutaciones accidentales
    let contador = 0;

    items.forEach((oferta) => {
      console.log(`Iteración ${contador}`);
      console.log('Procesando producto:', oferta.getProductoData().nombre);
      console.log('Estado inicial del producto:', {
        oferta: oferta.oferta,
        precio: oferta.precio,
        precioOriginal: oferta.precioOriginal,
        descuento: oferta.descuento,
      });

      if (oferta.oferta) {
        console.log('Se desactivará la oferta');
        oferta.precio = oferta.precioOriginal || oferta.precio;
        oferta.descuento = 0;
        oferta.oferta = false;
        oferta.precioOriginal = undefined;

        console.log('Estado después de desactivar la oferta:', {
          oferta: oferta.oferta,
          precio: oferta.precio,
          precioOriginal: oferta.precioOriginal,
          descuento: oferta.descuento,
        });

        const productoData = oferta.getProductoData();
        console.log(
          'Datos del producto que se enviarán para actualización:',
          productoData
        );
        this.updateProducto(oferta.id, productoData);
      } else {
        console.log('Se activará la oferta');
        oferta.oferta = true;
        oferta.descuento = 50;
        oferta.precioOriginal = oferta.precio;
        oferta.precio = oferta.precioOriginal! * (1 - 50 / 100);

        console.log('Estado después de activar la oferta:', {
          oferta: oferta.oferta,
          precio: oferta.precio,
          precioOriginal: oferta.precioOriginal,
          descuento: oferta.descuento,
        });

        const productoData = oferta.getProductoData();
        console.log(
          'Datos del producto que se enviarán para actualización:',
          productoData
        );
        this.updateProducto(oferta.id, productoData);
      }
      contador++;
    });

    console.log('Fin de toggleOferta');
  }

  toggleFavorito(selectedItems: Producto[]) {
    selectedItems.forEach((item) => {
      item.favorito = !item.favorito;
      const productoData = item.getProductoData();
      this.updateProducto(item.id, productoData);
    });
  }

  addProducto(producto: any): void {
    this.productoModel.productos.push(producto);
    this.productoDAO.addProducto(producto).subscribe({
      next: (producto: any) => {
        this.productoModel.producto = producto;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getProductos(): void {
    this.productoDAO.getProductos().subscribe({
      next: (productos: Producto[]) => {
        const productosCreados = this.productoModel.crearProductos(productos);
        this.algoModel.algos = productosCreados;
        this.productosSubject.next(productosCreados);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getProductosArray(): void {
    this.productoDAO.getProductos().subscribe({
      next: (productos: Producto[]) => {
        const productosCreados = this.productoModel.crearProductos(productos);
        this.productosSubject.next(productosCreados);
        this.productoModel.productos = productosCreados;
        this.algoModel.algos = productosCreados;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      },
    });
  }

  getProductosLettering(): void {
    this.productoDAO.getProductosLettering().subscribe({
      next: (productos: Producto[]) => {
        const productosCreados = this.productoModel.crearProductos(productos);
        this.productos = productosCreados;
        this.productoModel.productos = productosCreados;
        this.algoModel.algos = productosCreados;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getProductosScrapbooking(): void {
    this.productoDAO.getProductosScrapbooking().subscribe({
      next: (productos: Producto[]) => {
        const productosCreados = this.productoModel.crearProductos(productos);
        this.productos = productosCreados;
        this.productoModel.productos = productosCreados;
        this.algoModel.algos = productosCreados;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getProductosOferta(): void {
    this.productoDAO.getProductosOferta().subscribe({
      next: (productos: Producto[]) => {
        const productosCreados = this.productoModel.crearProductos(productos);
        this.productos = productosCreados;
        this.productoModel.productos = productosCreados;
        this.algoModel.algos = productosCreados;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getProducto(id: number): void {
    this.productoDAO.getProducto(id).subscribe({
      next: (producto: Producto) => {
        const productosCreados = this.productoModel.crearProductos([producto]);
        this.algoModel.algo = productosCreados[0];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  findByName(term: string): void {
    this.productoDAO.findByName(term).subscribe({
      next: (productos: Producto[]) => {
        const productosCreados = this.productoModel.crearProductos(productos);
        this.algoModel.algos = productosCreados;
        this.productosSubject.next(productosCreados);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateProducto(id: any, producto: any): void {
    // producto = (producto as Producto).getProductoData();
    this.productoDAO.updateProducto(id, producto).subscribe({
      next: (producto: any) => {
        this.productoModel.producto = producto;
        this.algoModel.algo = producto;
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error.message, error);
      },
    });
  }

  deleteProducto(id: number): void {
    this.productoDAO.deleteProducto(id).subscribe({
      next: (producto: Producto) => {
        this.productoModel.producto = producto;
        const productosActualizados = this.productoModel.crearProductos(
          this.productoModel.productos.filter((prod) => prod.id !== id)
        );
        this.productoModel.productos = productosActualizados;
        this.algoModel.algos = productosActualizados;
        this.productosSubject.next(productosActualizados);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
