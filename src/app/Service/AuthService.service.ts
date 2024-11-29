import { Injectable } from '@angular/core';
import { UserAuthority } from '../Model/Domain/UserAuthority.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  admin: boolean = true;
  private authorities: Set<UserAuthority> = new Set<UserAuthority>();

  // Método para establecer el rol del usuario
  setUserAuthority(authority: UserAuthority) {
    this.authorities.clear();
    this.authorities.add(authority);
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    return this.authorities.has(UserAuthority.ADMIN);
  }

  // Método para obtener todas las autoridades del usuario
  getUserAuthorities(): Set<UserAuthority> {
    return this.authorities;
  }
}
