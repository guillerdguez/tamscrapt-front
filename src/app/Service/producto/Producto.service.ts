import { Injectable } from '@angular/core';
import { ProductoDAO } from '../../DAO/producto.DAO';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { BehaviorSubject } from 'rxjs';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';
import { MessageService } from 'primeng/api';
import { CallbacksProductoService } from '../Callbacks/CallbacksService';

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
    private callbacksProductoService: CallbacksProductoService,
    private messageService: MessageService
  ) {
    // Suscribirse a los eventos emitidos por CallbacksProductoService

    this.callbacksProductoService.deleteProductos$.subscribe(
      (selectedItems) => {
        this.deleteMultipleProductos(selectedItems);
      }
    );
    this.callbacksProductoService.editProductos$.subscribe((selectedItems) => {
      this.editMultipleProductos(selectedItems);
    });

    this.callbacksProductoService.toggleOfertas$.subscribe((selectedItems) => {
      this.toggleOfertas(selectedItems);
    });

    this.callbacksProductoService.toggleFavorito$.subscribe((selectedItems) => {
      this.toggleFavorito(selectedItems);
    });
  }

  // Implementación de los métodos suscritos
  editMultipleProductos(selectedItems: Producto[]) {
    selectedItems.forEach((item) => {
      if (!item.oferta) {
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
    this.algoModel.algos.push(producto);
    this.productoDAO.addProducto(producto).subscribe({
      next: (producto: any) => {
        console.log('servicio', producto);
        this.productoModel.producto = producto;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Created',
        });
      },
      error: (error) => {
        let detalleError = '';

        // Personalizar el mensaje según el código de estado
        if (error.status === 500) {
          detalleError =
            'Error del servidor. Por favor, verifica los logs del backend o intenta nuevamente más tarde.';
        } else if (error.status === 400) {
          detalleError =
            'Error en la solicitud. Por favor, revisa los datos enviados.';
        } else if (error.status) {
          detalleError = `Ocurrió un error inesperado. Código de estado: ${error.status}.`;
        }
        // Agregar el mensaje al sistema de notificaciones
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: detalleError,
        });
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
  //es necesario o solo con los model vale?
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
      next: () => {
        // const productosCreados = this.productoModel.crearProductos([producto]);

        this.algoModel.algo = this.productoModel.productos.find(
          (p) => p.id === id
        );
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
    // const productosFiltrados = this.productoModel.productos.map((p) => {
    //   if (p.id === id) {
    //     this.getProducto(id);
    //   }
    //   this.getProducto(p.id);
    //   return this.algoModel.algo;
    // });

    this.productoDAO.updateProducto(id, producto).subscribe({
      next: (producto: any) => {
        console.log(producto);
        this.productoModel.producto = producto;
        this.algoModel.algo = producto;
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error.message, error);
      },
    });
  }

  deleteProducto(id: number): void {
    const productosFiltrados = this.productoModel.productos.filter(
      (p) => p.id !== id
    );
    this.productoModel.productos = productosFiltrados;
    this.algoModel.algos = productosFiltrados;

    this.productoDAO.deleteProducto(id).subscribe({
      next: () => {
        this.algoModel.algosSeleccionados.length = 0;
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
