import { Injectable } from '@angular/core';
import { ProductoDAO } from '../DAO/producto.DAO';
import { AlgoModel } from '../Model/Views/Dynamic/AlgoModel';
import { Producto } from '../Model/Domain/ProductoClass';
import { BehaviorSubject } from 'rxjs';
import { ProductoModel } from '../Model/Views/Dynamic/ProductoModel';
import { CallbacksService } from './Callbacks/CallbacksService';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  public productos$ = this.productosSubject.asObservable();
  private productos: Producto[] = [];

  private mensajeMostrado = false;
  private tiempoEspera = 2000;
  constructor(
    private productoDAO: ProductoDAO,
    private algoModel: AlgoModel,
    public productoModel: ProductoModel,
    private callbacksService: CallbacksService,
    private messageService: MessageService
  ) {
    // Suscribirse a los eventos emitidos por CallbacksService

    this.callbacksService.deleteProductos$.subscribe((selectedItems) => {
      this.deleteMultipleProductos(selectedItems);
    });
    this.callbacksService.editProductos$.subscribe((selectedItems) => {
      this.editMultipleProductos(selectedItems);
    });

    this.callbacksService.toggleOfertas$.subscribe((selectedItems) => {
      this.toggleOfertas(selectedItems);
    });

    this.callbacksService.toggleFavorito$.subscribe((selectedItems) => {
      this.toggleFavorito(selectedItems);
    });
  }

  // Implementación de los métodos suscritos
  editMultipleProductos(selectedItems: Producto[]) {
    selectedItems.forEach((item) => {
      if (!item.oferta) {
        console.log(item);
        //  this.toggleOferta(item, item.descuento);
        item.precioOriginal = undefined;
        item.descuento = 0;
      }
      this.updateProducto(item.id, item.getProductoData());
    });
    this.algoModel.algosSeleccionados.length = 0;
  }
  
  toggleOfertas(selectedItems: Producto[]) {
    selectedItems.forEach((item) => {
      this.toggleOferta(item, item.descuento);
    });
  }
  deleteMultipleProductos(selectedItems: any[]) {
    selectedItems.forEach((item) => this.deleteProducto(item.id));
  }
  //cambia lo que muestra,boton no permite editar barios,acortar y necesita uno para

  toggleOferta(item: any, descuento: number) {
    console.log('llama?');
    if (item.oferta) {
      item.precio = item.precioOriginal || item.precio;
      item.descuento = 0;
      item.oferta = false;
      item.precioOriginal = undefined;

      const productoData = item.getProductoData();

      this.updateProducto(item.id, productoData);
    } else {
      item.oferta = true;
      item.descuento = descuento;
      item.precioOriginal = item.precio;
      item.precio = item.precioOriginal! * (1 - descuento / 100);

      const productoData = item.getProductoData();

      this.updateProducto(item.id, productoData);
    }
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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Created',
        });
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
        // this.algoModel.algo.clear();
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
        if (!this.mensajeMostrado) {
          this.mensajeMostrado = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Deleted',
          });

          setTimeout(() => {
            this.mensajeMostrado = false;
          }, this.tiempoEspera);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
