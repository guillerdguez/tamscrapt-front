import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './AuthService.service';

export const roleGuard = (expectedRole: string) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasAuthority(expectedRole)) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
