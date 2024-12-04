import { Component } from '@angular/core';
import { AlgoModel } from '../../../Model/Views/Dynamic/AlgoModel';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { Producto } from '../../../Model/Domain/Producto/ProductoClass';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductoService } from '../../../Service/producto/Producto.service';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksService';

@Component({
  selector: 'app-dialago-oferta',
  templateUrl: './dialago-oferta.component.html',
  styleUrl: './dialago-oferta.component.css',
})
export class DialagoOfertaComponent {
  isDialogVisible: boolean = false;
  params!: any[];
  constructor(
    public algoModel: AlgoModel,
    public authService: AuthService,
    private productoService: ProductoService,
    private callbacksProductoService: CallbacksProductoService
  ) {}
  ngOnInit(): void {
    this.callbacksProductoService.openOfertaDialog$.subscribe(
      (selectedItems: Producto[]) => {
        this.params = [...selectedItems];
        this.isDialogVisible = true;
      }
    );
  }

  save(): void {
    this.productoService.editMultipleProductos(this.params);

    this.isDialogVisible = false;
    this.algoModel.algosSeleccionados.length = 0;
  }
}
