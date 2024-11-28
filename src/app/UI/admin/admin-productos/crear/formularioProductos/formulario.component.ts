import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoModel } from '../../../../../Model/Views/Dynamic/ProductoModel';
import { ProductoService } from '../../../../../Service/Producto.service';
import { ProductoDAO } from '../../../../../DAO/producto.DAO';
import { Producto } from '../../../../../Model/Domain/ProductoClass';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AlgoModel } from '../../../../../Model/Views/Dynamic/AlgoModel';
import { MenuItem } from 'primeng/api';
import { ProductoDetails } from '../../../../../Model/Domain/interface/ProductoDetails';
//si tiene descuento automaticamente esta en
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [DialogService],
})
export class FormularioComponentProducto implements OnInit {
  nombre: string = '';
  precio: number = 0;
  imagen: string = '';
  descuento: number = 0;
  lettering?: boolean;
  scrapbooking?: boolean;
  oferta?: boolean;
  ref?: DynamicDialogRef;
  cantidad!: number;

  constructor(
    private productoService: ProductoService,
    public productoModel: ProductoModel,
    private productoDao: ProductoDAO,
    private router: Router,
    private dialogService: DialogService,
    private algoModel: AlgoModel
  ) {}

  ngOnInit(): void {}
  add(
    nombre: string,
    precio: number,
    imagen: string,
    descuento: number,
    cantidad: number,
    lettering?: boolean,
    scrapbooking?: boolean,
    oferta?: boolean
  ): void {
    nombre = nombre.trim();

    if (!nombre || !precio) {
      return;
    }
    const precioOriginal =
      descuento > 0
        ? parseFloat((precio / (1 - descuento / 100)).toFixed(2))
        : 0;

    const newProducto: ProductoDetails = {
      nombre,
      precio,
      imagen,
      lettering,
      scrapbooking,
      oferta,
      cantidad,
      descuento,
      precioOriginal,
    };

    this.productoService.addProducto(newProducto);
    this.goBack();
  }
  goBack(): void {
    this.router.navigate(['/productos']);
    this.router.navigateByUrl(this.router.url);
  }

  openDialog(): void {
    this.ref = this.dialogService.open(FormularioComponentProducto, {
      header: 'Nuevo Producto',
      width: '50%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((producto: Producto) => {
      if (producto) {
        this.add(
          producto.nombre,
          producto.precio,
          producto.imagen,
          producto.descuento,
          producto.cantidad,
          producto.lettering,
          producto.scrapbooking,
          producto.oferta
        );
      }
    });
  }
}
