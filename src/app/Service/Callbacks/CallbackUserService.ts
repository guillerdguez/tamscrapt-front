import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../Model/Domain/User/UserClass';
import { UserService } from '../user/User.service';

@Injectable({
  providedIn: 'root',
})
export class CallbackUserService {
  constructor(private router: Router, private userService: UserService) {}

  createUser(selectedItems: User[]) {
    this.router.navigate(['/register']);
    this.userService.addUser(selectedItems);
  }

  deleteUsers(selectedItems: User[]) {
    this.userService.deleteMultipleUsers(selectedItems);
  }

  editUser(user: User) {
    this.router.navigate(['/detail/Users/', user.id]);
    this.userService.updateUser(user);
  }

  viewUser(user: User) {
    if (user.id !== undefined) {
      this.userService.getUser(user.id);
    }
  }
}
