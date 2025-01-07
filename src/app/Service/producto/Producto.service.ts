import { Injectable } from '@angular/core';
import { ProductoDAO } from '../../DAO/producto.DAO';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { Observable, of } from 'rxjs';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';
import { MessageService } from 'primeng/api';
import { CallbacksProductoService } from '../Callbacks/CallbacksProductoService';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[] = [];
  private mensajeMostrado = false;
  private tiempoEspera = 2000;
  // Mantendremos la categoría actual en una propiedad
  private currentCategory?: string;

  constructor(
    private productoDAO: ProductoDAO,
    private genericModel: GenericModel,
    public productoModel: ProductoModel,
    private callbacksProductoService: CallbacksProductoService,
    private messageService: MessageService
  ) {
    this.callbacksProductoService.deleteProductos$.subscribe(
      (selectedItems) => {
        this.deleteMultipleProductos(selectedItems);
      }
    );
    this.callbacksProductoService.editProductos$.subscribe((selectedItems) => {
      this.editMultipleProductos(selectedItems);
    });
  }

  // CREATE
  addProducto(producto: any): void {
    this.productoModel.productos.push(producto);
    this.genericModel.elements.push(producto);
    this.productoDAO.addProducto(producto).subscribe({
      next: (producto: any) => {
        this.productoModel.producto = producto;
        this.showSuccessMessage('Producto creado correctamente.');
      },
      error: (error) => this.handleError(error),
    });
  }

  // READ
  obtenerTodos(): Producto[] {
    return this.productoModel.productos;
  }

  getProductos(categoria?: string): void {
    if (this.currentCategory !== categoria) {
      this.currentCategory = categoria; // Guardamos la categoría actual
    }

    this.productoDAO.getProductos(this.currentCategory).subscribe({
      next: (productos: Producto[]) => {
        const productosCreados = this.productoModel.crearProductos(productos);

        this.genericModel.elements = productosCreados;
        // this.productosSubject.next(productosCreados);
      },
      error: (error) => this.handleError(error),
    });
  }

  // Obtener producto por ID
  getProducto(id: number): void {
    this.productoDAO.getProducto(id).subscribe({
      next: () => {},
      error: (error) => this.handleError(error),
    });
  }

  // Buscar por nombre

  searchProductos(term: string): Observable<Producto[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.productoDAO.searchProductos(term);
  }
  // UPDATE
  updateProducto(id: number, producto: Producto): void {
    this.productoDAO.updateProducto(id, producto).subscribe({
      next: (producto: Producto) => {
        this.productoModel.producto = producto;
        this.genericModel.element = producto;

        // Al volver a cargar, empleamos la categoría actual
      },
      error: (error) => this.handleError(error),
    });
  }

  // DELETE
  deleteProducto(id: number): void {
    this.productoDAO.deleteProducto(id).subscribe({
      next: () => {
        this.genericModel.elementsSeleccionados.length = 0;
        // Al volver a cargar, empleamos la categoría actual
        this.getProductos(this.currentCategory);

        if (!this.mensajeMostrado) {
          this.mensajeMostrado = true;
          this.showSuccessMessage('Producto eliminado.');

          setTimeout(() => {
            this.mensajeMostrado = false;
          }, this.tiempoEspera);
        }
      },
      error: (error) => this.handleError(error),
    });
  }

  // Manejo de múltiples ediciones
  editMultipleProductos(selectedItems: any[]) {
    selectedItems.forEach((item) => {
      this.updateProducto(item.id, item.getProductoData());
      if (!item.oferta) {
        this.toggleOferta(item, 0);
        item.precioOriginal = undefined;
      }
    });
    this.genericModel.elementsSeleccionados.length = 0;
  }

  // Manejo de múltiples ofertas
  toggleOfertas(selectedItems: any[]) {
    selectedItems.forEach((item) => {
      if (!item.oferta) {
        this.toggleOferta(item, 0);
        item.precioOriginal = undefined;
      } else {
        this.toggleOferta(item, item.descuento);
      }
      this.updateProducto(item.id, item.getProductoData());
    });
    this.genericModel.elementsSeleccionados.length = 0;
  }

  // Eliminación múltiple de productos
  deleteMultipleProductos(selectedItems: Producto[]) {
    selectedItems.forEach((item) => this.deleteProducto(item.id));
  }

  // Toggle de oferta
  toggleOferta(item: any, descuento: number) {
    if (descuento < 0 || descuento > 100) {
      throw new Error('El descuento debe estar entre 0 y 100.');
    }
    item.descuento = descuento;
    if (item.oferta) {
      item.precio = item.precioOriginal || item.precio;
      item.precioOriginal = item.precioOriginal || item.precio;
      item.descuento = descuento;
      item.precio = parseFloat(
        (item.precioOriginal - item.precioOriginal * (descuento / 100)).toFixed(
          2
        )
      );
      item.oferta = true;
    } else {
      if (!item.precioOriginal) {
        item.precioOriginal = item.precio;
      }
      item.precio = parseFloat(
        (item.precioOriginal * (1 - descuento / 100)).toFixed(2)
      );
      item.descuento = descuento;
      item.oferta = false;
    }

    const productoData = item.getProductoData();
    this.updateProducto(item.id, productoData);
  }

  // Mostrar mensaje de éxito
  private showSuccessMessage(detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
    });
    setTimeout(() => {
      this.mensajeMostrado = false;
    }, this.tiempoEspera);
  }

  // Manejo de errores
  private handleError(error: any): void {
    let detalleError = '';
    if (error.status === 500) {
      detalleError =
        'Error del servidor. Por favor, verifica los logs del backend o intenta nuevamente más tarde.';
    } else if (error.status === 400) {
      detalleError =
        'Error en la solicitud. Por favor, revisa los datos enviados.';
    } else if (error.status) {
      detalleError = `Ocurrió un error inesperado. Código de estado: ${error.status}.`;
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detalleError,
    });
  }
}
