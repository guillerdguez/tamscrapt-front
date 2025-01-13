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
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { ProductoService } from '../../Service/producto/Producto.service';
import { User } from '../../Model/Domain/User/UserClass';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { AuthService } from '../../Service/seguridad/AuthService.service';
import { CallbacksProductoService } from '../../Service/Callbacks/CallbacksProductoService';
import { UserAuthority } from '../../Model/Domain/User/UserAuthority.enum';
import { PasarInformacionTablaService } from '../../Service/pasar-informacion-tabla/pasar-informacion-tabla.service';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Output() paramsChange = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();

  itemsCopy: MenuItem[] = [];
  firstItem: any[] = [];
  items: MenuItem[] = [];
  layout!: 'list' | 'grid';
  userAuthority = UserAuthority;

  @ViewChild('menu') menu!: ContextMenu;

  headers: any[] = [];
  private currentTipo: string | null = null;
  get paramsTemporal(): User[] | Producto[] {
    return this.genericModel.elements;
  }

  constructor(
    private route: ActivatedRoute,
    public genericModel: GenericModel,
    public authService: AuthService,
    public pasarInformacionTablaService: PasarInformacionTablaService,
    public callbacksProductoService: CallbacksProductoService,
    public productoService: ProductoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const tipo = params.get('tipo');
      if (tipo !== this.currentTipo) {
        this.currentTipo = tipo;
        this.pasarInformacionTablaService.inicializar(tipo);
      }
    });
    this.pasarInformacionTablaService.title.subscribe((title) => {
      this.title = title;
    });

    this.layout = this.authService.hasAuthority(UserAuthority.ADMIN)
      ? 'list'
      : 'grid';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params']?.currentValue) {
      this.genericModel.elementsSeleccionados = [];
    }
  }

  onselectedTable(event: MouseEvent, item: any) {
    if (this.authService.hasAuthority(UserAuthority.ADMIN)) {
      if (event.button !== 2 && event.button !== 1) {
        if (!this.genericModel.elementsSeleccionados.includes(item)) {
          this.genericModel.elementsSeleccionados.push(item);
        } else {
          this.genericModel.elementsSeleccionados =
            this.genericModel.elementsSeleccionados.filter(
              (selected) => selected !== item
            );
        }
        this.TableSelected.emit(this.genericModel.elementsSeleccionados);
      }
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    if (this.authService.hasAuthority(UserAuthority.ADMIN)) {
      event.preventDefault();

      // A) Agregamos el item a la selección si no está ya
      if (!this.genericModel.elementsSeleccionados.includes(item)) {
        this.genericModel.elementsSeleccionados.push(item);
        this.TableSelected.emit(this.genericModel.elementsSeleccionados);
      }

      // B) Obtenemos los items para el menú contextual
      this.items = item.getMenuItems(
        this.genericModel.elementsSeleccionados,
        this.callbacksProductoService
      );

      // C) Mostramos el menú en la posición del ratón
      this.menu.show(event);
    }
  }

  onValueChange(item: any, field: string, newValue: any): void {
    item[field] = newValue;
    this.paramsChange.emit(item.setDetails(item));
  }

  getCreate() {
    this.items = this.paramsTemporal[0].getMenuItems(
      this.genericModel.elementsSeleccionados,
      this.callbacksProductoService
    );
    this.itemsCopy = [...this.items];
    this.firstItem = [this.itemsCopy[0]];
    this.firstItem[0].command();
  }
}
