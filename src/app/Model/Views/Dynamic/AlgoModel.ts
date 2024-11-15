import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlgoModel {
  constructor() {}
  algos: any[] = [];
  algo: any ;
  algosSeleccionadas: any[] = [];
  menuItemSeleccionado!: any;

  ejecutarMenuItem() {
    this.algosSeleccionadas.forEach((algo) => {
      if (this.menuItemSeleccionado) {
        let opciones = algo.getMenuItems(algo.getUrl());

        let opcion = opciones.find(
          (opcion: { label: any; }) => opcion.label == this.menuItemSeleccionado
        );

        opcion?.command();
      }
    });
    this.algosSeleccionadas = [];
  }
}
