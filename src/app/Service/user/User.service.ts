import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../Model/Domain/User/UserClass';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';
import { UserModel } from '../../Model/Views/Dynamic/UserModel';
import { UserDAO } from '../../DAO/user.DAO';
import { CallbackUserService } from '../Callbacks/CallbackUserService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();
  private users: User[] = [];

  constructor(
    private userDAO: UserDAO,
    private algoModel: AlgoModel,
    public userModel: UserModel,
    private callbacksService: CallbackUserService
  ) {
    // Suscribirse a los eventos emitidos por CallbackUserService
    this.callbacksService.deleteUsers$.subscribe((selectedItems) => {
      this.deleteMultipleUsers(selectedItems);
    });
  }

  deleteMultipleUsers(selectedItems: any[]): void {
    selectedItems.forEach((user) => this.deleteUser(user.id));
  }
  // Create
  addUser(user: User): void {
    this.userDAO.addUser(user).subscribe({
      next: (newUser: User) => {
        this.userModel.users.push(newUser);
        this.algoModel.algos.push(newUser);
        this.users.push(newUser);
        this.usersSubject.next(this.users);
      },
      error: (error) => {
        console.error('Error al agregar el usuario:', error);
      },
    });
  }

  // Read
  getUsers(): void {
    this.userDAO.getUsers().subscribe({
      next: (users: User[]) => {
        const usersCreados = this.userModel.crearUsers(users);
        this.algoModel.algos = usersCreados;
        this.users = usersCreados;
        this.usersSubject.next(usersCreados);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }

  getUsersArray(): void {
    this.userDAO.getUsers().subscribe({
      next: (users: User[]) => {
        const usersCreados = this.userModel.crearUsers(users);
        this.usersSubject.next(usersCreados);
        this.userModel.users = usersCreados;
        this.algoModel.algos = usersCreados;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }

  getUser(id: number): void {
    this.userDAO.getUser(id).subscribe({
      next: (user: User) => {
        this.algoModel.algo = user;
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error);
      },
    });
  }

  findByName(term: string): void {
    this.userDAO.findByName(term).subscribe({
      next: (users: User[]) => {
        const usersCreados = this.userModel.crearUsers(users);
        this.algoModel.algos = usersCreados;
        this.usersSubject.next(usersCreados);
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
      },
    });
  }

  // Update
  updateUser(user: User): void {
    this.userDAO.updateUser(user).subscribe({
      next: (updatedUser: User) => {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.userModel.users[index] = updatedUser;
          this.algoModel.algos[index] = updatedUser;
          this.usersSubject.next(this.users);
        }
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      },
    });
  }

  // Delete
  deleteUser(id: number): void {
    this.userDAO.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
        this.userModel.users = this.users;
        this.algoModel.algos = this.users;
        this.usersSubject.next(this.users);
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      },
    });
  }
}
