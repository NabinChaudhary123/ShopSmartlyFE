import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const localStorageData = localStorage.getItem('accessToken');
  if(localStorageData != null){
    return true;
  }
  else{
    
    router.navigate(['/login']);
    return false;
  }
  
};
