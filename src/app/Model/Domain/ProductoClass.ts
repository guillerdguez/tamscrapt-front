import { Router } from '@angular/router';

import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Pedido } from './Pedido';
import { ProductoService } from '../../Service/Producto.service';
import { AlgoModel } from '../Views/Dynamic/AlgoModel';
import { ProductoModel } from '../Views/Dynamic/ProductoModel';
export class Producto {
  id!: number;
  nombre!: string;
  precio!: number;
  imagen!: string;
  lettering!: boolean;
  scrapbooking!: boolean;
  oferta!: boolean;
  descuento!: number;
  precioFinal!: number;
  pedidos!: Pedido[];
  [key: string]: any;
  url: string = '/newHeroes';
  constructor(
    public router: Router,
    public algoModel: AlgoModel,
    public productoModel: ProductoModel,
    public dialogService: DialogService,
    public productoService: ProductoService
  ) {}

  getMenuItems(url: string) {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => this.router.navigate([url]),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(),
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => this.router.navigate(['/detail/producto/', this.id]),
      },
    ];
  }

  getMenuItemOptions() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'Create';
          this.algoModel.ejecutarMenuItem();
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'Delete';
          this.algoModel.ejecutarMenuItem();
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'Edit';
          this.algoModel.ejecutarMenuItem();
        },
      },
    ];
  }
  //no puede ser scrap y lettering al mismo tiempo,herencia?algo disitinto en el menuItem?
  getHeaders() {
    return [
      { field: 'id', header: 'Id', type: 'number' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio', type: 'number' },
      { field: 'imagen', header: 'Imagen' },
      { field: 'lettering', header: 'Lettering' },
      { field: 'scrapbooking', header: 'Scrapbooking' },
      { field: 'oferta', header: 'Oferta' },
      { field: 'descuento', header: 'Descuento', type: 'number' },
      { field: 'precioFinal', header: 'Precio Final', type: 'number' },
    ];
  }

  delete(): void {
    this.productoModel.productos = this.productoModel.productos.filter((h) => h.id !== this.id);
    this.productoService.deleteProducto(this.id);
  }

  getUrl() {
    return this.url;
  }
}
