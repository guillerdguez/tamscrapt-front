import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../Model/Views/Dynamic/UserModel';
import { UserService } from '../../../Service/User.service';
import { User } from '../../../Model/Domain/User/UserClass';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    public userModel: UserModel
  ) {}
  ngOnInit(): void {
    this.userService.getUsers();
  }

  add(arg0: string) {
    throw new Error('Method not implemented.');
  }
  delete(user: User): void {
    this.userModel.users = this.userModel.users.filter(
      (h) => h !== user
    );
    this.userService.deleteUser(user.id);
  }
}
