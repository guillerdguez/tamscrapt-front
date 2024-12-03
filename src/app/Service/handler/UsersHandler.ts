import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { UserService } from '../User.service';

@Injectable()
export class UsersHandler implements TipoHandler {
  constructor(private userService: UserService) {}

  execute(): void {
    this.userService.getUsersArray();
  }

  getTitle(): string {
    return 'Users';
  }
  getContextType(): string {
    return 'user';
  }
}
