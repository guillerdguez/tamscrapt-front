import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Domain/User/UserClass';
import { AlgoModel } from './AlgoModel';
import { UserService } from '../../../Service/User.service';
import { fail } from 'node:assert';

@Injectable({ providedIn: 'root' })
export class UserModel {
  users: User[] = [];
  user: User | undefined;
  admin: boolean = false;

  constructor(private router: Router, private algoModel: AlgoModel) {}

  crearUsers(users: User[], userService: UserService) {
    let listaUser: User[] = [];
    users.forEach((user) =>
      listaUser.push(
        new User(this.router, this.algoModel, this, userService).getParametros(
          user
        )
      )
    );
    return listaUser;
  }
}
