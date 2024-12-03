import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlgoModel {
  constructor() {}
  algos: any[] = [];
  algo: any;
  algosSeleccionados: any[] = [];
  menuItemSeleccionado!: any;

  seleccionar(item: any, menuItemLabel: string) {
    if (!this.algosSeleccionados.includes(item)) {
      this.algosSeleccionados.push(item);
    }

    this.menuItemSeleccionado = menuItemLabel;

    this.ejecutarMenuItem();
  }

  ejecutarMenuItem() {
    if (this.menuItemSeleccionado) {
      this.algosSeleccionados.forEach((producto) => {
        const opciones = producto.getMenuItems(
          this.algosSeleccionados,
          producto.menuStrategyFactory.getStrategy(
            this.algosSeleccionados[0].strategia
          )
        );

        const opcion = opciones.find(
          (opcion: { label: string }) =>
            opcion.label === this.menuItemSeleccionado
        );

        opcion?.command();
        // if (opcion.label !== 'Editar') {
        //   this.algosSeleccionados = [];
        // }
      });
    }
  }
}
