// auth.service.ts
import { Injectable } from '@angular/core';
import { UserAuthority } from './UserAuthority.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthority: UserAuthority | null = null;

  // Método para establecer el rol del usuario
  setUserAuthority(authority: UserAuthority) {
    this.userAuthority = authority;
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    return this.userAuthority === UserAuthority.ADMIN;
  }
}
