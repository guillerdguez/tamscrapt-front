// pasar-informacion-tabla.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';
import { ProductoService } from '../producto/Producto.service';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';
import { UserModel } from '../../Model/Views/Dynamic/UserModel';
import { UserService } from '../user/User.service';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { TipoFactory } from './TipoFactory';

@Injectable({
  providedIn: 'root',
})
export class PasarInformacionTablaService {
  public title$ = new BehaviorSubject<string>('');
  public selectedTable$ = new BehaviorSubject<any[]>([]);

  constructor(
    public algoModel: AlgoModel,
    public productoModel: ProductoModel,
    public productoService: ProductoService,
    public userModel: UserModel,
    public userService: UserService,
    private tipoFactory: TipoFactory
  ) {
    // Mejorar: Manejar otros tipos si es necesario
    // this.productoService.productos$.subscribe((productos) => {
    //   const productosConEstrategia =
    //     this.productoModel.crearProductos(productos);
    //   this.algoModel.algos = productosConEstrategia;
    // });
  }

  initialize(tipo: string | null, params?: any): void {
    if (!tipo) {
      console.log(tipo);
      console.error('Tipo no válido');
      return;
    }

    const handler: TipoHandler | null = this.tipoFactory.getHandler(tipo);
    if (handler) {
      handler.execute(params);
      this.title$.next(handler.getTitle());
    } else {
      console.log(tipo);
      console.error('Tipo no encontrado en la factory');
    }
  }

  onTableSelected(selectedTables: any[]): void {
    this.selectedTable$.next([...selectedTables]);
  }

  onParamsChange(updatedParams: any): void {
    if (updatedParams) {
      this.algoModel.algo = updatedParams;
      this.productoService.updateProducto(
        this.algoModel.algo.id, 
        this.algoModel.algo
      );
    }
  }
}
