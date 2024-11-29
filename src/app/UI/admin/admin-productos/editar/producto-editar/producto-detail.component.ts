import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductoModel } from '../../../../../Model/Views/Dynamic/ProductoModel';
import { ProductoService } from '../../../../../Service/Producto.service';
import { AlgoModel } from '../../../../../Model/Views/Dynamic/AlgoModel';
import { UserModel } from '../../../../../Model/Views/Dynamic/UserModel';
import { User } from '../../../../../Model/Domain/User/UserClass';
import { AuthService } from '../../../../../Service/AuthService.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnInit {
  params?: any[];
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private location: Location,
    public algoModel: AlgoModel,
    public user: AuthService,
    public productModel: ProductoModel,
    public router: Router
  ) {}
  // ngOnChanges(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.productoService.getProducto(id);
  // }
  ngOnInit(): void {
    console.log(this.algoModel.algosSeleccionados);
    if (this.algoModel.algosSeleccionados.length > 1) {
      this.params = this.algoModel.algosSeleccionados || [];
      console.log(this.algoModel.algosSeleccionados);
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProducto(id);
  }

  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }
  save(param: any): void {
    if (param) {
      this.productoService.updateProducto(param.id, param); // Actualización del producto
      console.log('Producto actualizado:', param);
    }
  }
  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  }
}
