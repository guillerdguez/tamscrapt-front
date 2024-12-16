import { Producto } from '../Producto/ProductoClass';
import { UserAuthority } from '../User/UserAuthority.enum';

export interface UserDetails {
  id?: number;
  nombre: string;
  username: string;
  password?: string;
  imagen?: string;
  favorito?: Producto[];
  email: string;
  authorities: UserAuthority[];
}
