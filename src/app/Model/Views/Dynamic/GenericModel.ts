import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericModel {
  elements: any[] = [];
  element: any;
  elementsSeleccionados: any[] = [];
  menuItemSeleccionado!: any;

  seleccionar(item: any, menuItemLabel: string) {
    if (!this.elementsSeleccionados.includes(item)) {
      this.elementsSeleccionados.push(item);
    }

    this.menuItemSeleccionado = menuItemLabel;
    this.ejecutarMenuItem();
  }

  ejecutarMenuItem() {
    if (this.menuItemSeleccionado) {
      this.elementsSeleccionados.forEach((producto) => {
        const opciones = producto.getMenuItems(
          this.elementsSeleccionados,
          producto.menuStrategyFactory.getStrategy(
            this.elementsSeleccionados[0].strategia
          )
        );

        const opcion = opciones.find(
          (opcion: { label: string }) =>
            opcion.label === this.menuItemSeleccionado
        );

        opcion?.command();
      });
    }
  }
}
