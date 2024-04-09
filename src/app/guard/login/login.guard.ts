import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  
  return new Promise<boolean>((resolve, reject) => {
    const router=inject(Router);
    const authService=inject(AuthService);
    if(!authService.isUserLoggedIn()){
      resolve(true)
    }
    else{
      router.navigate(['/'])
      resolve(false);

    }

  })
};
