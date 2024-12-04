import { UserAuthority } from '../User/UserAuthority.enum';

export interface UserDeails {
  id?: number;
  nombre: string;
  username: string;

  email: string;
  authorities: Set<UserAuthority>;
}
