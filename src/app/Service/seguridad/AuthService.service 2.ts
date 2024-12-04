// import { Injectable } from "@angular/core";
// import { Router } from "express";
// import { BehaviorSubject, Observable } from "rxjs";
// import { AuthDAO } from "../../DAO/AuthDAO";
// import { User } from "../../Model/Domain/User/User.interface";

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService2 {
//   private currentUserSubject: BehaviorSubject<User | null>;
//   public currentUser$: Observable<User | null>;

//   constructor(private authDAO: AuthDAO, private router: Router) {
//     const storedUser = localStorage.getItem('currentUser');
//     this.currentUserSubject = new BehaviorSubject<User | null>(
//       storedUser ? JSON.parse(storedUser) : null
//     );
//     this.currentUser$ = this.currentUserSubject.asObservable();
//   }

//   // Obtener el usuario actual
//   public get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   // LOGIN
//   login(username: string, password: string): void {
//     this.authDAO.login(username, password).subscribe((response) => {
//       if (response && response.token) {
//         // Almacena el token y el usuario en localStorage
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('currentUser', JSON.stringify(response.user));
//         this.currentUserSubject.next(response.user);
//       }
//     });
//   }

//   // REGISTER
//   register(user: any): void {
//     this.authDAO.register(user).subscribe();
//   }

//   // LOGOUT
//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/login']);
//   }

//   // VERIFICAR SI ESTÁ AUTENTICADO
//   isAuthenticated(): boolean {
//     const token = localStorage.getItem('token');
//     return !!token;
//   }

//   // VERIFICAR AUTORIZACIÓN
//   hasAuthority(authority: string): boolean {
//     const user = this.currentUserValue;
//     return user ? user.authorities.includes(authority) : false;
//   }

//   // OBTENER CLIENTES
//   getClients(): void {
//     this.authDAO.getClients().subscribe((users) => {
//       // Aquí puedes manejar la lista de usuarios como necesites
//     });
//   }

//   // OBTENER CLIENTE POR ID
//   getClientById(id: number): void {
//     this.authDAO.getClientById(id).subscribe((user) => {
//       // Manejar el usuario obtenido
//     });
//   }

//   // ACTUALIZAR CLIENTE
//   updateClient(id: number, user: any): void {
//     this.authDAO.updateClient(id, user).subscribe((updatedUser) => {
//       // Manejar el usuario actualizado
//     });
//   }

//   // ELIMINAR CLIENTE
//   deleteClientById(id: number): void {
//     this.authDAO.deleteClientById(id).subscribe(() => {
//       // Manejar la confirmación de eliminación
//     });
//   }
// }
