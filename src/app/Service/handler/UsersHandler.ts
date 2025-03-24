import { Injectable } from '@angular/core';
import { TipoManejador } from '../../Model/Domain/interface/TipoHandler';
import { UserService } from '../user/User.service';

@Injectable()
export class UsersHandler implements TipoManejador {
  constructor(private userService: UserService) {}

  ejecutar(): void {
    this.userService.getUsersArray();
  }

  getTitulo(): string {
    return 'Users';
  }
}
