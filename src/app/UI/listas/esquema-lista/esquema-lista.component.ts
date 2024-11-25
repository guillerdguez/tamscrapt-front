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
import { UserModel } from '../../../Model/Views/Dynamic/UserModel';
import { Producto } from '../../../Model/Domain/ProductoClass';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  @Output() paramsChange = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();
  @Input() params: any[] = [];
  @Input() title: string = '';

  paramsTemporal: any[] = [];
  items: MenuItem[] = [];
  layout!: 'list' | 'grid'
  @ViewChild('menu') menu!: ContextMenu;

  headers: any[] = [];

  constructor(public algoModel: AlgoModel, public userModel: UserModel) {}

  ngOnInit() {
    this.ParamsTemporal();
    this.initializeHeaders();
    if(this.userModel.admin){
      this.layout = 'list';
    }else{
      this.layout = 'grid';
    }
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
    // if (this.userModel.admin) {
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
    if (this.params.length > 0) {
      this.headers = this.paramsTemporal[0].getHeaders();
    }
  }

  onContextMenu(event: MouseEvent, item: Producto) {
    if (this.userModel.admin) {
      this.items = item.getMenuItemOptionsAdmin();
    } else {
      this.items = item.getMenuItemOptionsUser();
    }

    event.preventDefault();
    this.menu.show(event);

    if (!this.algoModel.algosSeleccionadas.includes(item)) {
      this.algoModel.algosSeleccionadas.push(item);

      this.TableSelected.emit(this.algoModel.algosSeleccionadas);
    }
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
