import { Injectable, OnDestroy } from '@angular/core'; // Agregando OnDestroy
import { Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Pedido } from './Pedido';
import { ProductoService } from '../../Service/Producto.service';
import { AlgoModel } from '../Views/Dynamic/AlgoModel';
import { ProductoModel } from '../Views/Dynamic/ProductoModel';
import { ProductoDetails } from './interface/ProductoDetails';
import { MenuItem } from 'primeng/api';
import { UserModel } from '../Views/Dynamic/UserModel';
import { OfertaDialogComponent } from '../../UI/admin/admin-productos/oferta-dialog /oferta-dialog.component';

// que tengan p-tag
// es Injectable por el DynamicDialogRef

@Injectable({ providedIn: 'root' })
export class Producto implements OnDestroy {
  id!: number;
  nombre!: string;
  precio!: number;
  imagen!: string;
  lettering?: boolean;
  scrapbooking?: boolean;
  oferta?: boolean;
  descuento: number = 0;
  precioOriginal?: number;
  pedidos?: Pedido[];
  favorito?: boolean;
  menuItems!: MenuItem[];
  ref!: DynamicDialogRef;

  // inventoryStatus?: string;
  // no puede ser letering y scrap al mismo tiempo
  url: string = '/newProducto';
  constructor(
    public router: Router,
    public algoModel: AlgoModel,
    public productoModel: ProductoModel,
    public userModel: UserModel,
    public productoService: ProductoService,
    public dialogService: DialogService
  ) {
    this.precioOriginal = this.getprecioOriginal();
    this.setMenuItems();
  }

  setDialogService(dialogService: DialogService) {
    this.dialogService = dialogService;
    return this;
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  getMenuItemsAdmin(url: string) {
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
        command: () => this.router.navigate(['/detail/Productos/', this.id]),
      },

      {
        label: 'oferta',
        icon: 'pi pi-heart',
        command: () => this.showDialogOferta(),
      },
    ];
  }

  getMenuItemOptionsAdmin() {
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
      {
        label: 'oferta',
        icon: 'pi pi-euro',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'oferta';
          this.algoModel.ejecutarMenuItem();
        },
      },
    ];
  }

  getMenuItemsUser() {
    return [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => this.router.navigate(['/detail/Productos/', this.id]),
      },
      {
        label: 'Favorito',
        icon: 'pi pi-heart',
        command: () => this.favoritoMethod(),
      },
      // {
      //   label: 'Carrito',
      //   icon: 'pi-cart-plus',

      //   command: () => this.favoritoMethod(),
      // },
    ];
  }

  getMenuItemOptionsUser() {
    return [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'Ver';
          this.algoModel.ejecutarMenuItem();
        },
      },
      {
        label: 'Favorito',
        icon: 'pi pi-heart',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'Favorito';
          this.algoModel.ejecutarMenuItem();
        },
      },
      // {
      //   label: 'Carrito',
      //   icon: 'pi-cart-plus',
      //   command: () => {
      //     this.algoModel.menuItemSeleccionado = 'Carrito';
      //     this.algoModel.ejecutarMenuItem();
      //   },
      // },
    ];
  }

  favoritoMethod() {
    this.favorito = !this.favorito;
    const productoData = this.getProductoData();
    this.productoService.updateProducto(this.id, productoData);
  }

  ofertaMethod() {
    if (this.oferta) {
      this.descuento = 0;
      this.oferta = !this.oferta;
      this.precioOriginal = undefined;
      const productoData = this.getProductoData();
      this.productoService.updateProducto(this.id, productoData);
    }
  }

  setMenuItems() {
    this.menuItems = this.userModel.admin
      ? this.getMenuItemOptionsAdmin()
      : this.getMenuItemOptionsUser();
  }

  // no puede ser scrap y lettering al mismo tiempo, herencia? algo distinto en el menuItem?
  getHeaders() {
    if (this.precioOriginal == undefined) {
      return [
        {
          field: 'nombre',
          header: 'Nombre',
          style: {
            'font-weight': 'bold',
            'font-size': '18px',
            'margin-bottom': '8px',
          },
        },
        {
          field: 'precio',
          header: 'Precio',
          type: 'number',
          style: {
            'font-size': '24px',
            'font-weight': '600',
            // color: '#1d3557',
            'margin-top': '4px',
          },
          formatter: (value: number) => `${value.toFixed(2)} €`,
        },
      ];
    } else {
      return [
        {
          field: 'nombre',
          header: 'Nombre',
          style: {
            'font-weight': 'bold',
            'font-size': '18px',
            'margin-bottom': '8px',
          },
        },
        {
          field: 'precio',
          header: 'Precio',
          type: 'number',
          style: {
            'font-size': '24px',
            'font-weight': '600',
            // color: '#1d3557',
            'margin-top': '4px',
          },
          formatter: (value: number) => `${value.toFixed(2)} €`,
        },
        {
          field: 'precioOriginal',
          header: 'Precio Original',
          type: 'number',
          style: {
            'font-size': '20px',
            color: '#888',
            'text-decoration': 'line-through',
            'margin-top': '4px',
          },
          formatter: (value: number) => `${value.toFixed(2)} €`,
        },
      ];
    }
  }

  showDialogOferta() {
    this.ref = this.dialogService.open(OfertaDialogComponent, {});
    if (this.ref) {
      let copiaLista: Producto[] = this.algoModel.algosSeleccionadas;
      console.log(copiaLista);
      this.ref.onClose.subscribe((descuento: number) => {
        if (copiaLista.length === 0) {
          this.changeOferta(descuento);
        } else {
          copiaLista.forEach((producto) => {
            producto.changeOferta(descuento);
          });
        }
      });
    }
  }

  changeOferta(descuento: number): void {
    if (this.oferta !== false) {
      this.descuento = descuento;
      // this.descuentoModel.descuentoGlobal = this.oferta;
    }
  }

  delete(): void {
    this.productoModel.productos = this.productoModel.productos.filter(
      (h) => h.id !== this.id
    );
    this.productoService.deleteProducto(this.id);
  }

  getUrl() {
    return this.url;
  }

  calcularPrecioOriginal(): number | undefined {
    if (this.descuento > 0) {
      return parseFloat((this.precio / (1 - this.descuento / 100)).toFixed(2));
    }
    return undefined;
  }

  getprecioOriginal(): number | undefined {
    return this.calcularPrecioOriginal();
  }

  getParametros(producto: Producto) {
    this.id = producto.id;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.imagen = producto.imagen;
    this.lettering = producto.lettering;
    this.scrapbooking = producto.scrapbooking;
    this.oferta = producto.oferta;
    this.descuento = producto.descuento;
    this.favorito = producto.favorito;
    this.precioOriginal = this.calcularPrecioOriginal();
    return this;
  }

  getProductoData(): ProductoDetails {
    return {
      id: this.id,
      nombre: this.nombre,
      precio: this.precio,
      imagen: this.imagen,
      lettering: this.lettering,
      scrapbooking: this.scrapbooking,
      oferta: this.oferta,
      descuento: this.descuento,
      precioOriginal: this.getprecioOriginal(),
      favorito: this.favorito,
    };
  }
}

// {
//       label: 'oferta',
//       icon: 'pi pi-heart', // Estado inicial
//       favorito: false, // Añadimos una propiedad para el estado de favorito
//       command: () => {
//         // Alternamos el estado del favorito
//         this.favorito = !this.favorito;

//         // Actualizamos el ícono según el estado del favorito
//         this.menuItems[0].icon = this.favorito
//           ? 'pi pi-heart-fill corazon-icon'
//           : 'pi pi-heart corazon-icon';

//         // Llamamos al método deseado (ejemplo)
//         this.ofertaMethod();
//       },
// }

// cuando esta en cuadricula en oferta, queda mal alineado
// {
//   field: 'imagen',
//   header: 'Imagen',
//   formatter: () =>
//     `<img src="${this.imagen}" alt="Producto" style="width:50px;height:50px;">`,
// },
