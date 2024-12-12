import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './AuthService.service';
import { UserAuthority } from '../../Model/Domain/User/UserAuthority.enum';

export const roleGuard = (expectedRole: UserAuthority) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasAuthority(expectedRole)) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
