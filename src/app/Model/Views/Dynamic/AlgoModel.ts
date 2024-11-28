import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlgoModel {
  constructor() {}
  algos: any[] = [];
  algo: any;
  algosSeleccionadas: any[] = [];
  menuItemSeleccionado!: any;

  seleccionarYEjecutar(item: any, menuItemLabel: string) {
    if (!this.algosSeleccionadas.includes(item)) {
      this.algosSeleccionadas.push(item);
    }

    this.menuItemSeleccionado = menuItemLabel;

    this.ejecutarMenuItem();
  }

  ejecutarMenuItem() {
    if (this.menuItemSeleccionado) {
      this.algosSeleccionadas.forEach((producto) => {
        const opciones = producto.getMenuItems(
          this.algosSeleccionadas,
          producto.menuStrategyFactory.getStrategy()
        );

        const opcion = opciones.find(
          (opcion: { label: string }) =>
            opcion.label === this.menuItemSeleccionado
        );

        opcion?.command();
      });
    }

    this.algosSeleccionadas = [];
  }
}
