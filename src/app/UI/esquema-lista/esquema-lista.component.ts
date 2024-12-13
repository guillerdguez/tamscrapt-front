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
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';
import { PasarInformacionTablaService } from '../../Service/pasar-informacion-tabla/pasar-informacion-tabla.component';
import { ProductoService } from '../../Service/producto/Producto.service';
import { User } from '../../Model/Domain/User/UserClass';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { AuthService } from '../../Service/seguridad/AuthService.service';
import { CallbacksProductoService } from '../../Service/Callbacks/CallbacksProductoService';
import { UserAuthority } from '../../Model/Domain/User/UserAuthority.enum';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  @Output() paramsChange = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();
  @Input() title: string = '';
  itemsCopy: MenuItem[] = [];
  firstItem: any[] = [];
  items: MenuItem[] = [];
  layout!: 'list' | 'grid';
  userAuthority = UserAuthority;
  @ViewChild('menu') menu!: ContextMenu;

  headers: any[] = [];

  get paramsTemporal(): User[] | Producto[] {
    return this.algoModel.algos;
  }

  constructor(
    private route: ActivatedRoute,
    public algoModel: AlgoModel,
    public authService: AuthService,
    public pasarInformacionTablaService: PasarInformacionTablaService,
    public callbacksProductoService: CallbacksProductoService,
    public productoService: ProductoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const tipo = params.get('tipo');
      this.pasarInformacionTablaService.initialize(tipo);
    });

    this.pasarInformacionTablaService.title$.subscribe((title) => {
      this.title = title;
    });

    this.layout = this.authService.hasAuthority(UserAuthority.ADMIN)
      ? 'list'
      : 'grid';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params']?.currentValue) {
      this.algoModel.algosSeleccionados = [];
    }
  }

  onselectedTable(event: MouseEvent, item: any) {
    if (event.button !== 2 && event.button !== 1) {
      if (!this.algoModel.algosSeleccionados.includes(item)) {
        this.algoModel.algosSeleccionados.push(item);
      } else {
        this.algoModel.algosSeleccionados =
          this.algoModel.algosSeleccionados.filter(
            (selected) => selected !== item
          );
      }
      this.TableSelected.emit(this.algoModel.algosSeleccionados);
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    if (!this.algoModel.algosSeleccionados.includes(item)) {
      this.algoModel.algosSeleccionados.push(item);
      this.TableSelected.emit(this.algoModel.algosSeleccionados);
    }

    this.items = item.getMenuItems(
      this.algoModel.algosSeleccionados,
      this.callbacksProductoService
    );
    this.menu.show(event);
  }

  onValueChange(item: any, field: keyof any, newValue: any): void {
    item[field] = newValue;
    this.paramsChange.emit(item.setDetails(item));
  }

  getCreate() {
    this.items = this.paramsTemporal[0].getMenuItems(
      this.algoModel.algosSeleccionados,
      this.callbacksProductoService
    );
    this.itemsCopy = [...this.items];
    this.firstItem = [this.itemsCopy[0]];
    this.firstItem[0].command();
  }
}
