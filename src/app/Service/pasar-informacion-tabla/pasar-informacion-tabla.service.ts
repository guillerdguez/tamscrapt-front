import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
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
  public title = new BehaviorSubject<string>('');
  public selectedTable = new BehaviorSubject<any[]>([]);

  constructor(
    public genericModel: GenericModel,
    public productoModel: ProductoModel,
    public productoService: ProductoService,
    public userModel: UserModel,
    public userService: UserService,
    private tipoFactory: TipoFactory
  ) {}

  inicializar(tipo: string | null, params?: any): void {
    if (!tipo) {
      console.log(tipo);
      console.error('Tipo no válido');
      return;
    }

    const handler: TipoHandler | null = this.tipoFactory.getHandler(tipo);
    if (handler) {
      handler.execute(params);
      this.title.next(handler.getTitle());
    } else {
      this.title.next(`"${tipo}" no existe`);
      this.genericModel.elements = [];
    }
  }

  onTableSelected(selectedTables: any[]): void {
    this.selectedTable.next([...selectedTables]);
  }

  onParamsChange(updatedParams: any): void {
    if (updatedParams) {
      this.genericModel.element = updatedParams;
      this.productoService.updateProducto(
        this.genericModel.element.id,
        this.genericModel.element
      );
    }
  }
}
