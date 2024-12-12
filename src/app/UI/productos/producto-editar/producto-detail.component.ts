import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductoService } from '../../../Service/producto/Producto.service';
import { AlgoModel } from '../../../Model/Views/Dynamic/AlgoModel';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { Producto } from '../../../Model/Domain/Producto/ProductoClass';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksProductoService';
import { UserAuthority } from '../../../Model/Domain/User/UserAuthority.enum';
@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnInit {
  params: any[] = [];
  userAuthority = UserAuthority;
  constructor(
    private productoService: ProductoService,
    private location: Location,
    public algoModel: AlgoModel,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public callbacksProductoService: CallbacksProductoService
  ) {}

  ngOnInit(): void {
    this.params = [...this.algoModel.algosSeleccionados];
    //borra los seleccionados si dan para atrás sin guardar
    this.location.subscribe(() => {
      this.algoModel.algosSeleccionados.length = 0;
    });
  }

  // goBack(): void {
  //   this.location.back();
  //   this.router.navigateByUrl(this.router.url);
  //   this.algoModel.algosSeleccionados.length = 0;
  // }

  save(): void {
    this.productoService.editMultipleProductos(this.params);
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }

  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  }
}
