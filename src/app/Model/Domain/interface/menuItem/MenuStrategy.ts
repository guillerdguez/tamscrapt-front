import { MenuItem } from 'primeng/api';

export interface MenuStrategy {
  getMenuItems(context: any, selectedItems: any[]): MenuItem[];
}
