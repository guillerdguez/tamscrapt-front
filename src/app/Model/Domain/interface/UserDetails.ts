import { Producto } from '../Producto/ProductoClass';
import { UserAuthority } from '../User/UserAuthority.enum';

export interface UserDeails {
  id?: number;
  nombre: string;
  username: string;
  favorito?: Producto[];
  email: string;
  authorities: UserAuthority[];
}
