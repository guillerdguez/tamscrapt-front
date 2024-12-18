import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../Service/seguridad/AuthService.service';
import { UserService } from '../../../../Service/user/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  returnUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        this.router.navigateByUrl(this.returnUrl);
        if (user.id) {
          this.userService.getUser(user.id);
        }
      },
      error: (error) => {
        this.errorMessage = error.error || 'Credenciales inválidas';
        console.error('Error al iniciar sesión:', error);
      },
    });
  }
}
