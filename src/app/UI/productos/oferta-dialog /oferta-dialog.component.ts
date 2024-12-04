import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlgoModel } from '../../../Model/Views/Dynamic/AlgoModel';

@Component({
  templateUrl: './oferta-dialog.component.html',
  styleUrls: ['./oferta-dialog.component.css'],
})
export class OfertaDialogComponent implements OnInit {
  descuentos!: any[]; // Array para manejar múltiples descuentos
  oferta!: boolean; // Estado de la oferta
  formGroup!: FormGroup; // Formulario reactivo

  stateOptions = [
    { label: 'Sí', value: true },
    { label: 'No', value: false },
  ];

  constructor(public ref: DynamicDialogRef, public algoModel: AlgoModel) {}

  ngOnInit(): void {
    // Inicializamos el formulario y los valores
    this.descuentos = [
      {
        nombre: this.algoModel.algosSeleccionados[0].nombre,
        descuento: this.algoModel.algosSeleccionados[0].descuento || 0,
      },
    ];
    this.oferta = this.algoModel.algo.oferta || false;

    this.formGroup = new FormGroup({
      oferta: new FormControl(this.oferta),
      descuento: new FormControl(this.descuentos[0].descuento),
    });
  }

  // Manejar cambios en la oferta
  onOfertaChange(): void {
    this.oferta = this.formGroup.get('oferta')?.value;
    if (!this.oferta) {
      this.descuentos[0].descuento = 0; // Restablecemos el descuento si se desactiva la oferta
    }
    this.syncModel();
  }

  // Actualizar el descuento
  updateDescuento(): void {
    this.descuentos[0].descuento = this.formGroup.get('descuento')?.value || 0;
    this.syncModel();
  }

  // Sincronizar con el modelo
  syncModel(): void {
    this.algoModel.algo.oferta = this.oferta;
    this.algoModel.algo.descuento = this.descuentos[0].descuento;
  }

  // Método para seleccionar una oferta
  selectOferta(): void {
    this.ref.close({
      oferta: this.oferta,
      descuento: this.descuentos[0].descuento,
    });
  }
}
