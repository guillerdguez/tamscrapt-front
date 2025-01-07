import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../Model/Domain/User/UserClass';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { UserModel } from '../../Model/Views/Dynamic/UserModel';
import { UserDAO } from '../../DAO/user.DAO';
import { CallbackUserService } from '../Callbacks/CallbackUserService';
import { CallbacksProductoService } from '../Callbacks/CallbacksProductoService';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { AuthService } from '../seguridad/AuthService.service';
import { MessageService } from 'primeng/api';
import { AuthDAO } from '../../DAO/Auth.DAO';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private usersSubject = new BehaviorSubject<User[]>([]);
  // public users$ = this.usersSubject.asObservable();
  private users: User[] = [];
  private userId: number | undefined = this.authService.getCurrentUserId();
  private mensajeMostrado = false;
  private tiempoEspera = 2000;
  private favoritosCliente: Producto[] = [];

  constructor(
    public authService: AuthService,
    private userDAO: UserDAO,
    private authDAO: AuthDAO,
    private genericModel: GenericModel,
    public userModel: UserModel,
    public productoModel: ProductoModel,
    private callbacksService: CallbackUserService,
    private callbacksProductoService: CallbacksProductoService,
    private messageService: MessageService
  ) {
    this.callbacksService.deleteUsers$.subscribe((selectedItems) => {
      this.deleteMultipleUsers(selectedItems);
    });
    this.callbacksProductoService.toggleFavorito$.subscribe((selectedItems) => {
      this.toggleFavorito(selectedItems);
    });
  }
  cargarFavoritos(clienteId: number): void {
    this.userDAO.obtenerFavoritos(clienteId).subscribe({
      next: (favoritos: Producto[]) => {
        console.log('Favoritos obtenidos:', favoritos);
        this.favoritosCliente = favoritos;
        this.productoModel.actualizarFavoritosCliente(favoritos);
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
      },
    });
  }
  addUser(user: any): void {
    this.authDAO.register(user).subscribe({
      next: (newUser: any) => {
        this.userModel.users.push(newUser);
        this.genericModel.elements.push(newUser);
        this.users.push(newUser);
        // this.usersSubject.next(this.users);
        this.getUsers();
      },
      error: (error) => {
        console.error('Error al agregar el usuario:', error);
      },
    });
  }

  getUsers(): void {
    this.userDAO.getUsers().subscribe({
      next: (users: User[]) => {
        const usersCreados = this.userModel.crearUsers(users);
        this.genericModel.elements = usersCreados;
        this.users = usersCreados;
        // this.usersSubject.next(usersCreados);
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
        // this.usersSubject.next(usersCreados);
        this.userModel.users = usersCreados;
        this.genericModel.elements = usersCreados;
      },
      error: () => this.handleError('Error al obtener usuarios'),
    });
  }

  getUser(id: number): void {
    this.resetUser();
    this.userDAO.getUser(id).subscribe({
      next: (user: User) => {
        if (user != this.userModel.user || this.userModel.user == undefined) {
          this.userModel.user = user;
          this.genericModel.element = user;
        }
      },
      error: () => this.handleError('Error al obtener usuario'),
    });
  }
  private resetUser(): void {
    this.genericModel.element = null;
  }

  findByName(term: string): void {
    this.userDAO.findByName(term).subscribe({
      next: (users: User[]) => {
        const usersCreados = this.userModel.crearUsers(users);
        this.genericModel.elements = usersCreados;
        // this.usersSubject.next(usersCreados);
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
      },
    });
  }

  updateUser(user: User): void {
    this.userDAO.updateUser(user).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      },
    });
  }

  deleteUser(id: number): void {
    this.userDAO.deleteUser(id).subscribe({
      next: () => {
        this.userModel.users = this.users;
        this.genericModel.elements = this.users;
        // this.usersSubject.next(this.users);
        this.getUsers();
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      },
    });
  }

  deleteMultipleUsers(selectedItems: any[]): void {
    selectedItems.forEach((user) => this.deleteUser(user.id));
  }

  toggleFavorito(selectedItems: Producto[]): void {
    if (this.userId === undefined) {
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
    if (this.userId === undefined) {
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
    if (this.userId === undefined) {
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
