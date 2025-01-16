import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoModel } from '../../../Model/Views/Dynamic/ProductoModel';
import { ProductoService } from '../../../Service/producto/Producto.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductoDetails } from '../../../Model/Domain/interface/ProductoDetails';
import { Location } from '@angular/common';
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
  cantidad: number = 1;

  constructor(
    private productoService: ProductoService,
    public productoModel: ProductoModel,
    private router: Router,
    private location: Location
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
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }
}
