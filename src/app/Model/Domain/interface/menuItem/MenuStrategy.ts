import { MenuItem } from 'primeng/api';
import { Producto } from '../../ProductoClass';

export interface MenuStrategy {
  getMenuItems(
    producto: Producto,
    selectedItems: Producto[],
    callbacks: any
  ): MenuItem[];
}
