import { Injectable } from '@angular/core';
import { ProductoDAO } from '../../DAO/producto.DAO';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { forkJoin, Observable, of } from 'rxjs';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[] = [];
  private mensajeMostrado = false;
  private tiempoEspera = 2000;
  private currentCategory?: string;
  private favoritosCliente: Producto[] = [];

  constructor(
    private productoDAO: ProductoDAO,
    private genericModel: GenericModel,
    public productoModel: ProductoModel,
    private messageService: MessageService
  ) {}
  addProducto(producto: any): void {
    this.productoDAO.addProducto(producto).subscribe({
      next: (producto: any) => {
        this.productoModel.producto = producto;
        this.showSuccessMessage('Producto creado correctamente.');
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  obtenerTodos(): Producto[] {
    return this.productoModel.productos;
  }
  getProductos(categoria?: string): void {
    if (this.currentCategory !== categoria) {
      this.currentCategory = categoria;
    }

    if (this.productoModel.userId) {
      forkJoin({
        productos: this.productoDAO.getProductos(this.currentCategory),
        favoritos: this.productoDAO.obtenerFavoritos(this.productoModel.userId),
      }).subscribe({
        next: ({ productos, favoritos }) => {
          this.favoritosCliente = favoritos;
          this.productoModel.actualizarFavoritosCliente(favoritos);

          const productosCreados = this.productoModel.crearProductos(productos);
          this.genericModel.elements = productosCreados;
        },
        error: (error) => {
          console.error('Error al cargar datos:', error);
        },
      });
    } else {
      this.productoDAO.getProductos(this.currentCategory).subscribe({
        next: (productos: Producto[]) => {
          const productosCreados = this.productoModel.crearProductos(productos);
          this.genericModel.elements = productosCreados;
        },
        error: (error) => {
          console.error('Error al cargar productos:', error);
        },
      });
    }
  }
  getProductosPorIds(ids: number[]): Observable<Producto[]> {
    const observables = ids.map((id) => this.productoDAO.getProducto(id));
    return forkJoin(observables);
  }
 
  cargarFavoritos(clienteId: any): void {
    this.productoDAO.obtenerFavoritos(clienteId).subscribe({
      next: (favoritos: Producto[]) => {
        this.favoritosCliente = favoritos;

        this.productoModel.actualizarFavoritosCliente(favoritos);
        const productosCreados = this.productoModel.crearProductos(favoritos);
        this.genericModel.elements = productosCreados;
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
      },
    });
  }
  actualizarFavoritosCliente(clienteId: any): void {
    this.productoDAO.cargarFavoritos(clienteId).subscribe({
      next: (favoritos: Producto[]) => {
        this.productoModel.actualizarFavoritosCliente(favoritos);
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
      },
    });
  }

  getProducto(id: number): void {
    this.productoDAO.getProducto(id).subscribe({
      next: (producto: any) => {
        const productosCreado = this.productoModel.crearProductos([producto]);

        if (Array.isArray(productosCreado[0])) {
          this.genericModel.element = productosCreado[0];
        } else {
          this.genericModel.element = productosCreado;
        }
      },
      error: (error) => this.handleError(error),
    });
  }
  getProductoPedido(id: number): void {
    this.productoDAO.getProducto(id).subscribe({
      next: (producto: any) => {
        this.productoModel.producto = producto;
        // return producto;
        // const productosCreado = this.productoModel.crearProductos([producto]);
        // this.genericModel.element = productosCreado[0];
      },
      error: (error) => this.handleError(error),
    });
  }

  buscarProductos(term: string): Observable<Producto[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.productoDAO.buscarProductos(term);
  }
  updateProducto(id: number, producto: Producto): void {
    this.productoDAO.updateProducto(id, producto).subscribe({
      next: (producto: Producto) => {
        this.productoModel.producto = producto;
        this.genericModel.element = producto;
        this.getProductos(this.currentCategory);
      },
      error: (error) => this.handleError(error),
    });
  }

  deleteProducto(id: number): void {
    this.productoDAO.deleteProducto(id).subscribe({
      next: () => {
        this.genericModel.elementsSeleccionados.length = 0;
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

  updateMultipleProductos(selectedItems: any[]) {
    selectedItems.forEach((item) => {
      this.updateProducto(item.id, item.getProductoData());
      if (!item.oferta) {
        this.alternarOferta(item, 0);
        item.precioOriginal = undefined;
      }
    });
    // this.genericModel.elementsSeleccionados.length = 0;
  }

  alternarOfertas(selectedItems: any[]) {
    selectedItems.forEach((item) => {
      if (!item.oferta) {
        this.alternarOferta(item, 0);
        item.precioOriginal = undefined;
      } else {
        this.alternarOferta(item, item.descuento);
      }
      this.updateProducto(item.id, item.getProductoData());
    });
    this.genericModel.elementsSeleccionados.length = 0;
  }

  deleteMultipleProductos(selectedItems: Producto[]) {
    selectedItems.forEach((item) => this.deleteProducto(item.id));
  }

  alternarOferta(item: any, descuento: number) {
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
