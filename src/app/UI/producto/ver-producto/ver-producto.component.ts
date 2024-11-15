import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../Service/Producto.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlgoModel } from '../../../Model/Views/Dynamic/AlgoModel';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrl: './ver-producto.component.css',
})
export class VerProductoComponent implements OnInit {
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private location: Location,
    public algoModel: AlgoModel
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProducto(id);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.algoModel.algo) {
      this.productoService.updateProducto(
        this.algoModel.algo.id,
        this.algoModel.algo
      );
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
