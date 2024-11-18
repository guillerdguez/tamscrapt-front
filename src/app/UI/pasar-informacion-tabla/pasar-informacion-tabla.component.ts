// pasar-informacion-tabla.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';
import { ProductoService } from '../../Service/Producto.service';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';

@Component({
  selector: 'app-pasar-informacion-tabla',
  template: `
    @if(algoModel.algos.length > 0) {
      <div class="container">
        <app-esquema-lista
          [title]="title"
          [params]="algoModel.algos"
          (paramsChange)="onParamsChange($event)"
          (TableSelected)="onTableSelected($event)"
        ></app-esquema-lista>
      </div>
    } @else {
      <h2 class="title">Sin resultados</h2>
    }
  `,
})
export class PasarInformacionTablaComponent {
  title!: string;
  selectedTable: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public algoModel: AlgoModel,
    public productoModel: ProductoModel,
    public productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const tipo = params.get('tipo');

      switch (tipo) {
        case 'productos':
          this.productoService.getProductosArray();
          this.title = 'Productos';
          break;
        case 'scrapbooking':
          this.productoService.getProductosScrapbookingArray();
          this.title = 'Scrapbooking';
          break;
        case 'lettering':
          this.productoService.getProductosLetteringArray();
          this.title = 'Lettering';
          break;
        case 'ofertas':
          this.productoService.getProductosOfertaArray();
          this.title = 'Ofertas';
          break;
          case 'clientes':
            this.productoService.getProductosOfertaArray();
            this.title = 'Clientes';
            break;
        default:
          console.log('Tipo no válido');
      }
    });
  }

  onTableSelected(selectedTables: any) {
    this.selectedTable = [...selectedTables];
  }

  onParamsChange(updatedParams: any) {
    this.route.paramMap.subscribe((params) => {
      const tipo = params.get('tipo');
      if (tipo === 'productos') {
        this.algoModel.algo = updatedParams;
        this.productoService.updateProducto(
          this.algoModel.algo.id,
          this.algoModel.algo
        );
      }
    });
  }
}
