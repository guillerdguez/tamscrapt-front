import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../Service/Producto.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductoModel } from '../../../Model/Views/Dynamic/ProductoModel';
@Component({
  selector: 'app-Admin-ver-producto',
  templateUrl: './Admin-ver-producto.component.html',
  styleUrl: './Admin-ver-producto.component.css',
})
export class AdminVerProductoComponent implements OnInit {
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private location: Location,
    public productoModel: ProductoModel
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProducto(id);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.productoModel.producto) {
      this.productoService.updateProducto(this.productoModel.producto.id,this.productoModel.producto);
      this.goBack();
    }
  }
  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  }
}
