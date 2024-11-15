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
import { Producto } from '../../../Model/Domain/ProductoClass';
import { User } from '../../../Model/Domain/User/UserClass';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  addToCart(_t15: any) {
    throw new Error('Method not implemented.');
  }
  @Output() paramsChange = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();
  //  | User
  @Input() params: Producto[] = [];
  @Input() title: string = '';

  paramsTemporal: any[] = [];
  headers: any[] = [];
  items: MenuItem[] = [];

  @ViewChild('menu') menu!: ContextMenu;

  constructor(public algoModel: AlgoModel) {}

  ngOnInit() {
    this.ParamsTemporal();
    this.initializeHeaders();
    this.rellenador();
 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params']?.currentValue) {
      this.ParamsTemporal();
      this.initializeHeaders();
      this.rellenador();
      this.algoModel.algosSeleccionadas = [];
    }
  }

  ngDoCheck() {
    if (this.params !== this.paramsTemporal) {
      this.ParamsTemporal();
      this.rellenador();
    }
  }

  onselectedTable(event: MouseEvent, item: any) {
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

  ParamsTemporal() {
    this.paramsTemporal = [...this.params];
  }

  initializeHeaders() {
    if (this.headers.length === 0 && this.paramsTemporal.length) {
      // this.headers = this.paramsTemporal[0].getHeaders();
      this.headers = [
        { field: 'id', header: 'Id', type: 'number' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'precio', header: 'Precio', type: 'number' },
        { field: 'imagen', header: 'Imagen' },
        { field: 'lettering', header: 'Lettering' },
        { field: 'scrapbooking', header: 'Scrapbooking' },
        { field: 'oferta', header: 'Oferta' },
        { field: 'descuento', header: 'Descuento', type: 'number' },
        { field: 'precioFinal', header: 'Precio Final', type: 'number' },
      ];
    }
  }

  rellenador() {
    while (this.paramsTemporal.length % 10 !== 0) {
      this.paramsTemporal.push([]);
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    this.items = item.getMenuItemOptions();
    event.preventDefault();
    this.menu.show(event);

    if (!this.algoModel.algosSeleccionadas.includes(item)) {
      this.algoModel.algosSeleccionadas.push(item);
    }

    this.TableSelected.emit(this.algoModel.algosSeleccionadas);
  }

  onValueChange(item: any, field: keyof any, newValue: any): void {
    item[field] = newValue;
    this.paramsChange.emit(item.setDetails(item));
  }
  onKeyPress(event: KeyboardEvent, type: string): void {
    if (type === 'number') {
      const char = event.key;

      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    }
  }
}
