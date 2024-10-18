import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Producto } from '../../../../Model/Domain/Producto';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrl: './esquema-lista.component.css',
})
export class EsquemaListaComponent implements OnInit {
  @Input() params: Producto[] = [];
  hasItems: boolean = false; 
  ngOnInit() {
    this.updateHasItems();
  }

  ngOnChanges() {
    this.updateHasItems();
  }

  private updateHasItems() {
    this.hasItems = this.params.length > 0;
  }
  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  }
}
