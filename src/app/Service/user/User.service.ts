import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../Model/Domain/User/UserClass';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';
import { UserModel } from '../../Model/Views/Dynamic/UserModel';
import { UserDAO } from '../../DAO/user.DAO';
import { CallbackUserService } from '../Callbacks/CallbackUserService';
import { CallbacksProductoService } from '../Callbacks/CallbacksProductoService';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { AuthService } from '../seguridad/AuthService.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();
  private users: User[] = [];
  private userId: number | null = this.authService.getCurrentUserId();
  private mensajeMostrado = false;
  private tiempoEspera = 2000;

  constructor(
    public authService: AuthService,

    private userDAO: UserDAO,
    private algoModel: AlgoModel,
    public userModel: UserModel,
    private callbacksService: CallbackUserService,
    private callbacksProductoService: CallbacksProductoService,
    private messageService: MessageService
  ) {
    // Suscribirse a los eventos emitidos por CallbackUserService
    this.callbacksService.deleteUsers$.subscribe((selectedItems) => {
      this.deleteMultipleUsers(selectedItems);
    });
    this.callbacksProductoService.toggleFavorito$.subscribe((selectedItems) => {
      this.toggleFavorito(selectedItems);
    });
  }

  deleteMultipleUsers(selectedItems: any[]): void {
    selectedItems.forEach((user) => this.deleteUser(user.id));
  }

  toggleFavorito(selectedItems: Producto[]): void {
    if (this.userId === null) {
      console.error('Usuario no autenticado. No se puede gestionar favoritos.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se puede gestionar favoritos sin un usuario autenticado.',
      });
      return;
    }

    selectedItems.forEach((item) => {
      if (item.favorito) {
        this.eliminarDeFavoritos(item);
      } else {
        this.agregarAFavoritos(item);
      }
    });
  }

  agregarAFavoritos(producto: Producto): void {
    if (this.userId === null) {
      console.error('Usuario no autenticado. No se puede agregar a favoritos.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe estar autenticado para agregar productos a favoritos.',
      });
      return;
    }

    this.userDAO.agregarFavorito(this.userId, producto.id).subscribe({
      next: () => {
        producto.favorito = true;
      },
      error: (error) => this.handleError(error),
    });
  }

  eliminarDeFavoritos(producto: Producto): void {
    if (this.userId === null) {
      console.error(
        'Usuario no autenticado. No se puede eliminar de favoritos.'
      );
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe estar autenticado para eliminar productos de favoritos.',
      });
      return;
    }

    this.userDAO.eliminarFavorito(this.userId, producto.id).subscribe({
      next: () => {
        producto.favorito = false;
      },
      error: (error) => this.handleError(error),
    });
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

  private showSuccessMessage(detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
    });
    setTimeout(() => {
      this.mensajeMostrado = false;
    }, this.tiempoEspera);
  }

  private handleError(error: any): void {
    let detalleError = '';
    if (error.status === 500) {
      detalleError =
        'Error del servidor. Por favor, verifica los logs del backend o intenta nuevamente más tarde.';
    } else if (error.status === 400) {
      detalleError =
        'Error en la solicitud. Por favor, revisa los datos enviados.';
    } else if (error.status) {
      detalleError = `Ocurrió un error inesperado. Código de estado: ${error.status}.`;
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detalleError,
    });
  }
}
