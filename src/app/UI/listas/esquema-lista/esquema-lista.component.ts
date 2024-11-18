import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { AlgoModel } from '../../../Model/Views/Dynamic/AlgoModel';
import { ProductoModel } from '../../../Model/Views/Dynamic/ProductoModel';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  admin: boolean = true;

  @Output() paramsChange = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();
  @Input() params: any[] = [];
  @Input() title: string = '';

  paramsTemporal: any[] = [];
  items: MenuItem[] = [];
  layout: 'list' | 'grid' = 'list';
  @ViewChild('menu') menu!: ContextMenu;

  // Arreglo para almacenar los encabezados
  headers: { field: string; header: string; type?: string }[] = [];

  constructor(public algoModel: AlgoModel, private productoModel: ProductoModel) {}

  ngOnInit() {
    this.ParamsTemporal();
    this.initializeHeaders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params']?.currentValue) {
      this.ParamsTemporal();
      this.algoModel.algosSeleccionadas = [];
      this.initializeHeaders();
    }
  }

  ngDoCheck() {
    if (this.params !== this.paramsTemporal) {
      this.ParamsTemporal();
    }
  }

  onselectedTable(event: MouseEvent, item: any) {
    if (this.admin) {
      if (event.button !== 2 && event.button !== 1) {
        if (!this.algoModel.algosSeleccionadas.includes(item)) {
          this.algoModel.algosSeleccionadas.push(item);
        } else {
          this.algoModel.algosSeleccionadas =
            this.algoModel.algosSeleccionadas.filter(
              (selected) => selected !== item
            );
        }
        this.TableSelected.emit(this.algoModel.algosSeleccionadas);
      }
    }
  }

  ParamsTemporal() {
    this.paramsTemporal = [...this.params];
  }

  // Inicializa los encabezados utilizando el método getHeaders() del primer elemento
  initializeHeaders() {
    if (this.paramsTemporal.length > 0) {
      const firstItem = this.paramsTemporal[0];
      if (typeof firstItem.getHeaders === 'function') {
        this.headers = firstItem.getHeaders();
      } else {
        // Si getHeaders no está disponible, obtenemos las claves dinámicamente
        this.headers = Object.keys(firstItem)
          .filter((key) => key !== 'id') // Excluimos 'id' si es necesario
          .map((key) => ({
            field: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
          }));
      }
    } else {
      this.headers = [];
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    if (this.admin) {
      if (typeof item.getMenuItemOptions === 'function') {
        this.items = item.getMenuItemOptions();
      } else {
        this.items = []; // Opciones por defecto si no existe getMenuItemOptions
      }

      event.preventDefault();
      this.menu.show(event);

      if (!this.algoModel.algosSeleccionadas.includes(item)) {
        this.algoModel.algosSeleccionadas.push(item);
      }

      this.TableSelected.emit(this.algoModel.algosSeleccionadas);
    }
  }

  onValueChange(item: any, field: keyof any, newValue: any): void {
    item[field] = newValue;
    if (typeof item.setDetails === 'function') {
      this.paramsChange.emit(item.setDetails(item));
    } else {
      this.paramsChange.emit(item);
    }
  }

  onKeyPress(event: KeyboardEvent, type: string): void {
    if (type === 'number') {
      const char = event.key;

      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    }
  }

  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat(
      (precioConDescuento / (1 - descuento / 100)).toFixed(2)
    );
  }

  // Función para determinar si un campo debe mostrarse
  headerToShow(field: string): boolean {
    const fieldsToShow = this.productoModel.getFieldsToShow();
    return fieldsToShow.includes(field);
  }

  // Función para formatear valores según el tipo
  formatValue(field: string, value: any): any {
    const header = this.headers.find((h) => h.field === field);
    if (header) {
      if (header.type === 'number') {
        return value.toLocaleString('es-ES');
      }
      if (header.type === 'currency') {
        return value.toLocaleString('es-ES', {
          style: 'currency',
          currency: 'EUR',
        });
      }
      if (header.type === 'boolean') {
        return value ? 'Sí' : 'No';
      }
    }
    return value;
  }
}
