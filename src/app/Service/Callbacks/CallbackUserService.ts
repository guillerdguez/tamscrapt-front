import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../Model/Domain/User/UserClass';

@Injectable({
  providedIn: 'root',
})
export class CallbackUserService {
  createUser$ = new Subject<void>();
  deleteUsers$ = new Subject<User[]>();
  editUser$ = new Subject<any>();
  viewUser$ = new Subject<User>();
  alternarOferta$ = new Subject<User[]>();
  alternarFavorito$ = new Subject<User[]>();

  url: string = '/newUser';

  constructor(private router: Router) {}

  createUser() {
    this.router.navigate([this.url]);
    this.createUser$.next();
  }

  deleteUsers(selectedItems: User[]) {
    this.deleteUsers$.next(selectedItems);
  }

  editUser(user: User) {
    this.router.navigate(['/detail/Users/', user.id]);
    this.editUser$.next(user);
  }

  viewUser(user: User) {
    this.viewUser$.next(user);
  }
  alternarOferta(selectedItems: User[]) {
    this.alternarOferta$.next(selectedItems);
  }

  alternarFavorito(selectedItems: User[]) {
    this.alternarFavorito$.next(selectedItems);
  }
}
