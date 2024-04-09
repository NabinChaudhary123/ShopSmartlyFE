import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  
  return new Promise<boolean>((resolve, reject) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if(authService.getUserRole() == 'ADMIN'){
      resolve(true);
    }
    else{
      router.navigate(['/login'])
      resolve(false)
    }
  })
};
