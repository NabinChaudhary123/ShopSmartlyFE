import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  return new Promise<boolean>((resolve, reject) => {
    const router = inject(Router)
    if (typeof window !== 'undefined') {
      const localStorageData = window.localStorage.getItem('accessToken');
      if (localStorageData != null) {
        resolve(true);
      }
      else {

        router.navigate(['/login']);
        resolve(false)
      }
    }
    else {
      reject(new Error('Window Object is not available'));
    }
  })





};
