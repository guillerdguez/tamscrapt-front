import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlgoModel {
 
  constructor() {}
  algos: any[] = [];
  algo: any;
  algosSeleccionadas: any[] = [];
  menuItemSeleccionado!: any;
  seleccionarYEjecutar(item: any, menuItemLabel: string) {
    // Seleccionar el elemento (si aún no está seleccionado)
    if (!this.algosSeleccionadas.includes(item)) {
      this.algosSeleccionadas.push(item);
    }

    // Establecer el elemento seleccionado en `menuItemSeleccionado`
    this.menuItemSeleccionado = menuItemLabel;

    // Ejecutar el comando seleccionado
    this.ejecutarMenuItem();
  }

  ejecutarMenuItem() {
    this.algosSeleccionadas.forEach((algo) => {
      if (this.menuItemSeleccionado) {
        let opciones;

        // Dependiendo del rol del usuario, obtenemos las opciones de menú.
        if (algo.userModel.admin) {
          opciones = algo.getMenuItemsAdmin(algo.getUrl());
        } else {
          opciones = algo.getMenuItemsUser();
        }

        // Buscar la opción correspondiente al menú seleccionado.
        let opcion = opciones.find(
          (opcion: { label: string }) =>
            opcion.label === this.menuItemSeleccionado
        );

        // Ejecutar el comando si se encuentra la opción.
        opcion?.command();
      }
    });

    // Limpiar la selección de elementos después de ejecutar las acciones.
    this.algosSeleccionadas = [];
  }
}
