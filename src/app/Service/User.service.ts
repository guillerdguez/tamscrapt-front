import { Injectable } from '@angular/core';
import { User } from '../Model/Domain/User/UserClass';
import { AlgoModel } from '../Model/Views/Dynamic/AlgoModel';
import { UserModel } from '../Model/Views/Dynamic/UserModel';
import { UserDAO } from '../DAO/user.DAO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userDAO: UserDAO,
    private algoModel: AlgoModel,
    public userModel: UserModel
  ) {}
  //Create
  addUser(user: User): void {
    this.algoModel.algos.push(User);
    this.userDAO.addUser(user).subscribe({
      next: (user: User) => {
        this.algoModel.algo = User;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  //READ
  getUsers(): void {
    this.userDAO.getUsers().subscribe({
      next: (users: User[]) => {
        this.algoModel.algos = users;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private users: User[] = [];

  getUsersArray(): User[] {
    this.userDAO.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = this.userModel.crearUsers(users, this);

        this.userModel.users = this.userModel.crearUsers(users, this);
        this.algoModel.algos = this.userModel.crearUsers(users, this);
      },
      error: (error) => {
        console.error(error);
      },
    });

    return this.users;
  }

  getUser(id: number): void {
    this.userDAO.getUser(id).subscribe({
      next: (user: User) => {
        this.algoModel.algo = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  findByName(term: string): void {
    this.userDAO.findByName(term).subscribe({
      next: (users: User[]) => {
        this.algoModel.algos = users;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  //UPDATE
  // updateUser(user: User): void {
  //   this.userDAO.updateUser(User).subscribe({
  //     next: (user: User) => {
  //       this.algoModel.algo = User;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //   });
  // }
  // UPDATE
  updateUser(user: any): void {
    this.userDAO.updateUser(user).subscribe({
      next: (user: any) => {
        this.userModel.user = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  //DELETE
  deleteUser(id?: number): void {
    this.userDAO.deleteUser(id).subscribe({
      next: (user: User) => {
        this.userModel.user = user;
        this.algoModel.algos = this.userModel.users.filter(
          (User) => User.id !== id
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
