import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductoService } from '../../../../../Service/Producto.service';
import { AlgoModel } from '../../../../../Model/Views/Dynamic/AlgoModel';
import { AuthService } from '../../../../../Service/AuthService.service';
import { CallbacksService } from '../../../../../Service/Callbacks/CallbacksService';
import { Producto } from '../../../../../Model/Domain/ProductoClass';
@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnInit {
  params: any[] = [];

  constructor(
    private productoService: ProductoService,
    private location: Location,
    public algoModel: AlgoModel,
    public user: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public callbacksService: CallbacksService
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
