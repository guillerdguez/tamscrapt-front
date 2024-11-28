import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductoModel } from '../../../../../Model/Views/Dynamic/ProductoModel';
import { ProductoService } from '../../../../../Service/Producto.service';
import { AlgoModel } from '../../../../../Model/Views/Dynamic/AlgoModel';
import { UserModel } from '../../../../../Model/Views/Dynamic/UserModel';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private location: Location,
    public algoModel: AlgoModel,
    public userModel: UserModel,
    public productModel: ProductoModel,
    public router: Router
  ) {}
  // ngOnChanges(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.productoService.getProducto(id);
  // }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProducto(id);
  }

  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }
  save(): void {
    if (this.algoModel.algo) {
      this.productoService.updateProducto(
        this.algoModel.algo.id,
        this.algoModel.algo.getProductoData()
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
