import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { ProductoService } from '../producto/Producto.service';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';
import { UserModel } from '../../Model/Views/Dynamic/UserModel';
import { UserService } from '../user/User.service';
import { TipoManejador } from '../../Model/Domain/interface/TipoHandler';
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
       console.error('Tipo no válido');
      return;
    }

    const manejador: TipoManejador | null = this.tipoFactory.getManejador(tipo);
    if (manejador) {
      manejador.ejecutar(params);
      this.title.next(manejador.getTitulo());
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


