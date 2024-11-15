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
  addProducto(producto: Producto): void {
    this.algoModel.algos.push(producto);
    this.productoDAO.addProducto(producto).subscribe({
      next: (producto: Producto) => {
        this.algoModel.algo = producto;
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
        this.productos = productos;
        this.productoModel.productos = productos;
        this.algoModel.algos = productos;
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
        this.productos = productos;
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
        this.productos = productos;
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
        this.productos = productos;
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
  updateProducto(id: number, producto: Producto): void {
    console.log(
      producto,
      'Proddddddddddddddddddddddddddddddddddddddddddddddddddducto'
    );
    this.productoDAO.updateProducto(id, producto).subscribe({
      next: (producto: Producto) => {
        this.algoModel.algo = producto;
        console.log(
          'bieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen'
        );
      },
      error: (error) => {
        console.error(
          error,
          'maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal'
        );
      },
    });
  }

  //DELETE
  deleteProducto(id: number): void {
    this.productoDAO.deleteProducto(id).subscribe({
      next: (producto: Producto) => {
        this.algoModel.algo = producto;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
