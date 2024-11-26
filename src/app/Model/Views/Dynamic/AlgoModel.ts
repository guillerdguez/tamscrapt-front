import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
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
    this.algosSeleccionadas.forEach((algo) => {
      if (this.menuItemSeleccionado) {
        let opciones;

        if (algo.userModel.admin) {
          opciones = algo.getMenuItemsAdmin(algo.getUrl());
        } else {
          opciones = algo.getMenuItemsUser();
        }

        let opcion = opciones.find(
          (opcion: { label: string }) =>
            opcion.label === this.menuItemSeleccionado
        );

        opcion?.command();
      }
    });

    this.algosSeleccionadas = [];
  }
}
