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
import { AlgoModel } from '../../../Model/Views/Dynamic/AlgoModel';
import { UserModel } from '../../../Model/Views/Dynamic/UserModel';
import { PasarInformacionTablaService } from '../../pasar-informacion-tabla/pasar-informacion-tabla.component';
import { CallbacksService } from '../../../Service/CallbacksService';
import { ProductoService } from '../../../Service/Producto.service';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  // sobran @?
  @Output() paramsChange = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();
  @Input() title: string = '';

  paramsTemporal: any[] = [];
  items: MenuItem[] = [];
  layout!: 'list' | 'grid';
  @ViewChild('menu') menu!: ContextMenu;

  headers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public algoModel: AlgoModel,
    public userModel: UserModel,
    public pasarInformacionTablaService: PasarInformacionTablaService,
    public callbacksService: CallbacksService,
    public productoService: ProductoService
  ) {}
  ngOnInit() {
    this.ParamsTemporal();

    this.route.paramMap.subscribe((params) => {
      const tipo = params.get('tipo');
      this.pasarInformacionTablaService.initialize(tipo);
    });

    this.pasarInformacionTablaService.title$.subscribe((title) => {
      this.title = title;
    });

    this.pasarInformacionTablaService.selectedTable$.subscribe(
      (selectedTables) => {
        this.algoModel.algosSeleccionadas = [...selectedTables];
      }
    );

    this.layout = this.userModel.admin ? 'list' : 'grid';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params']?.currentValue) {
      this.ParamsTemporal();
      this.algoModel.algosSeleccionadas = [];
      this.initializeHeaders();
    }
  }

  ngDoCheck() {
    if (this.algoModel.algos !== this.paramsTemporal) {
      this.ParamsTemporal();
      this.initializeHeaders();
      console.log(this.paramsTemporal[0].getSeverity().toString());
    }
  }
  // algoss = {
  //   tag: 'Ejemplo de etiqueta',
  //   getSeverity: ():
  //     | 'success'
  //     | 'secondary'
  //     | 'info'
  //     | 'warning'
  //     | 'danger'
  //     | 'contrast'
  //     | undefined => {
  //     return 'success'; // Cambiar según las condiciones
  //   },
  // };

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
      this.pasarInformacionTablaService.onTableSelected(
        this.algoModel.algosSeleccionadas
      );

      this.TableSelected.emit(this.algoModel.algosSeleccionadas);
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    if (this.userModel.admin) {
      if (!this.algoModel.algosSeleccionadas.includes(item)) {
        this.algoModel.algosSeleccionadas.push(item);

        this.pasarInformacionTablaService.onTableSelected(
          this.algoModel.algosSeleccionadas
        );

        this.TableSelected.emit(this.algoModel.algosSeleccionadas);
      }

      this.items = item.getMenuItems(
        this.algoModel.algosSeleccionadas,
        this.callbacksService
      );
      this.menu.show(event);
    }
  }

  onValueChange(item: any, field: keyof any, newValue: any): void {
    item[field] = newValue;
    this.pasarInformacionTablaService.onParamsChange(item);

    this.paramsChange.emit(item.setDetails(item));
  }

  ParamsTemporal() {
    this.paramsTemporal = this.algoModel.algos;
  }
  initializeHeaders() {
    this.headers = this.algoModel.algos[0].getHeaders();
  }
}
