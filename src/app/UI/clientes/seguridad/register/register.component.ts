import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Service/seguridad/AuthService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: any = {
    username: '',
    nombre: '',
    email: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.error || 'Error al registrar el usuario';
        console.error('Error al registrar:', error);
      },
    });
  }
}
