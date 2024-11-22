import { Injectable } from '@angular/core';
import { ProductoDAO } from '../DAO/producto.DAO';
import { AlgoModel } from '../Model/Views/Dynamic/AlgoModel';
import { Producto } from '../Model/Domain/ProductoClass';
import { Observable } from 'rxjs';
import { ProductoModel } from '../Model/Views/Dynamic/ProductoModel';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(
    private productoDAO: ProductoDAO,
    private algoModel: AlgoModel,
    public productoModel: ProductoModel
  ) {}
  //Create
  addProducto(producto: any): void {
    // this.algoModel.algos.push(producto);
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

  //READ
  getProductos(): void {
    this.productoDAO.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.algoModel.algos = productos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private productos: Producto[] = [];

  getProductosArray(): Producto[] {
    this.productoDAO.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.productos = this.productoModel.crearProductos(productos, this);

        this.productoModel.productos = this.productoModel.crearProductos(
          productos,
          this
        );
        this.algoModel.algos = this.productoModel.crearProductos(
          productos,
          this
        );
      },
      error: (error) => {
        console.error(error);
      },
    });

    return this.productos;
  }

  getProductosLettering(): void {
    this.productoDAO.getProductosLettering().subscribe({
      next: (productos: Producto[]) => {
        this.productos = productos;
        this.productoModel.productos = productos;
        this.algoModel.algos = productos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  getProductosLetteringArray(): Producto[] {
    this.productoDAO.getProductosLettering().subscribe({
      next: (productos: Producto[]) => {
        this.productos = this.productoModel.crearProductos(productos, this);

        this.productoModel.productos = this.productoModel.crearProductos(
          productos,
          this
        );
        this.algoModel.algos = this.productoModel.crearProductos(
          productos,
          this
        );
      },
      error: (error) => {
        console.error(error);
      },
    });

    return this.productos;
  }
  getProductosScrapbooking(): void {
    this.productoDAO.getProductosScrapbooking().subscribe({
      next: (productos: Producto[]) => {
        this.productos = productos;
        this.productoModel.productos = productos;
        this.algoModel.algos = productos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  getProductosScrapbookingArray(): Producto[] {
    this.productoDAO.getProductosScrapbooking().subscribe({
      next: (productos: Producto[]) => {
        this.productos = this.productoModel.crearProductos(productos, this);

        this.productoModel.productos = this.productoModel.crearProductos(
          productos,
          this
        );
        this.algoModel.algos = this.productoModel.crearProductos(
          productos,
          this
        );
      },
      error: (error) => {
        console.error(error);
      },
    });

    return this.productos;
  }

  getProductosOferta(): void {
    this.productoDAO.getProductosOferta().subscribe({
      next: (productos: Producto[]) => { 
        this.algoModel.algos = productos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  getProductosOfertaArray(): Producto[] {
    this.productoDAO.getProductosOferta().subscribe({
      next: (productos: Producto[]) => {
        this.productos = this.productoModel.crearProductos(productos, this);

        this.productoModel.productos = this.productoModel.crearProductos(
          productos,
          this
        );
        this.algoModel.algos = this.productoModel.crearProductos(
          productos,
          this
        );
      },
      error: (error) => {
        console.error(error);
      },
    });

    return this.productos;
  }

  getProducto(id: number): void {
    this.productoDAO.getProducto(id).subscribe({
      next: (producto: Producto) => {
        this.algoModel.algo = producto;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  findByName(term: string): void {
    this.productoDAO.findByName(term).subscribe({
      next: (productos: Producto[]) => {
        this.algoModel.algos = productos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  //UPDATE
  // updateProducto(producto: Producto): void {
  //   this.productoDAO.updateProducto(producto).subscribe({
  //     next: (producto: Producto) => {
  //       this.algoModel.algo = producto;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //   });
  // }
  // UPDATE
  updateProducto(id: any, producto: any): void { 
    this.productoDAO.updateProducto(id, producto).subscribe({
      next: (producto: any) => {
        this.productoModel.producto = producto;
        this.algoModel.algos = this.productoModel.productos;
        // this.algoModel.algos = this.algoModel.algos.filter(
        //   (algo) => (algo as Producto).favorito === producto.favorito
        // );
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error.message, error);
      },
    });
  }

  //DELETE
  deleteProducto(id: number): void {
    this.productoDAO.deleteProducto(id).subscribe({
      next: (producto: Producto) => {
        this.productoModel.producto = producto;
        this.algoModel.algos = this.productoModel.productos.filter(
          (producto) => producto.id !== id
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
