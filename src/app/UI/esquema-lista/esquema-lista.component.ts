import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { ProductoService } from '../../Service/producto/Producto.service';
import { User } from '../../Model/Domain/User/UserClass';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { AuthService } from '../../Service/seguridad/AuthService.service';
import { UserAuthority } from '../../Model/Domain/User/UserAuthority.enum';
import { PasarInformacionTablaService } from '../../Service/pasar-informacion-tabla/pasar-informacion-tabla.service';
import { CallbacksProductoService } from '../../Service/Callbacks/CallbacksProductoService';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit {
  @Input() title: string = '';
  @Output() paramsChange = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();

  itemsCopy: MenuItem[] = [];
  firstItem: any[] = [];
  items: MenuItem[] = [];
  layout!: 'list' | 'grid';
  userAuthority = UserAuthority;

  @ViewChild('menu') menu!: ContextMenu;
  @ViewChild('top') topElement!: ElementRef;
  headers: any[] = [];
  private currentTipo: string | null = null;

  // Propiedades para el ordenamiento
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  selectedSortOption: any;

  get paramsTemporal(): User[] | Producto[] {
    if (this.selectedSortOption) {
      this.onSortChange({ value: this.selectedSortOption });
    }

    return this.genericModel.elements;
  }

  constructor(
    private route: ActivatedRoute,
    public genericModel: GenericModel,
    public authService: AuthService,
    public pasarInformacionTablaService: PasarInformacionTablaService,
    public productoService: ProductoService,
    public callbacksProductoService: CallbacksProductoService
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

    // Inicializar opciones de ordenamiento
    //factoria segun el tipo?
    this.sortOptions = [
      { label: 'Nombre Ascendente', value: 'nombre' },
      { label: 'Nombre Descendente', value: '!nombre' },
      { label: 'Precio Ascendente', value: 'precio' },
      { label: 'Precio Descendente', value: '!precio' },
      { label: 'Con Descuento Primero', value: '!descuento' },
      { label: 'Más Stock', value: '!cantidad' },
    ];
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params']?.currentValue) {
      this.genericModel.elements = [];
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
      this.items = item.getMenuItems(this.genericModel.elementsSeleccionados);

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
      this.genericModel.elementsSeleccionados
    );
    this.itemsCopy = [...this.items];
    this.firstItem = [this.itemsCopy[0]];
    this.firstItem[0].command();
  }

  // Evento para cambiar el criterio de ordenamiento
  onSortChange(event: any) {
    const value = event.value;
    if (value.startsWith('!')) {
      this.sortOrder = -1;
      this.sortField = value.substring(1);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
    this.sortElements();
  }
  //los cambios que hace el admin no son automaticos porque vuelve a llamar la lista y esa no esta ordenada de primeras
  // Ordenar los elementos localmente sin mutar el array original
  sortElements() {
    const sorted = [...this.genericModel.elements].sort((a: any, b: any) => {
      let valA = a[this.sortField];
      let valB = b[this.sortField];

      // Manejar campos numéricos
      if (
        this.sortField === 'precio' ||
        this.sortField === 'descuento' ||
        this.sortField === 'cantidad'
      ) {
        valA = a[this.sortField] != null ? Number(a[this.sortField]) : 0;
        valB = b[this.sortField] != null ? Number(b[this.sortField]) : 0;

        // Asegurar que NaN se trate como 0
        valA = isNaN(valA) ? 0 : valA;
        valB = isNaN(valB) ? 0 : valB;

        return (valA - valB) * this.sortOrder;
      }

      // Manejar campos de texto
      return String(valA).localeCompare(String(valB)) * this.sortOrder;
    });
    console.log(sorted, '        ', this.sortField);
    // Asignar el array ordenado para que Angular detecte el cambio
    this.genericModel.elements = sorted;

    // // Emitir los cambios si es necesario
    // this.paramsChange.emit(this.genericModel.elements);
  }
  onPageChange(event: any): void {
    this.topElement.nativeElement.scrollIntoView();
  }
}
