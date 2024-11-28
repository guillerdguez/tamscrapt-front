import { MenuItem } from 'primeng/api';

export interface MenuStrategy {
  getMenuItems(any: any, selectedItems: any[], callbacks: any): MenuItem[];
}
