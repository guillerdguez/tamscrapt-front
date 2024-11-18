import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';
import { ProductoService } from '../../Service/Producto.service';
import { Producto } from '../../Model/Domain/ProductoClass';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';

@Component({
  selector: 'app-pasar-informacion-tabla',
  template: `
    @if(algoModel.algos.length> 0){
    <div class="continer">
      <!-- <app-select-form
        (selectedTable)="onTableSelected($event)"
        [isTableEmpty]="
          selectedTable.length == 0 && algoModel.algos.length != 0
        "
        [items]="algoModel.algos[0].getMenuItemOptions()"
      ></app-select-form> -->
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
  title!: any;
  toggleFavorite!: any;
  selectedTable: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public algoModel: AlgoModel,
    public productoModel: ProductoModel,
    public productoService: ProductoService
  ) {}

  ngOnInit(): void {
    // setInterval(() => console.log(this.algoModel.algos), 200);
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
        default:
          console.log('Tipo no válido');
      }
    });
  }

  onTableSelected(selectedTables: any) {
    this.selectedTable = [...selectedTables];
  }

  onParamsChange(updatedParams: ProductoService) {
    this.route.paramMap.subscribe((params) => {
      const tipo = params.get('tipo');
      if (tipo === 'productos') {
        this.algoModel.algo = updatedParams;
        this.productoService.updateProducto(
          this.algoModel.algo.id,
          this.algoModel.algo
        );
      }
      // else {
      //   this.villainModel.villain = updatedParams as Villain;
      //   this.villainService.updateVillain(
      //     this.villainModel.villain.getVillain()
      //   ); }
    });
  }
}
