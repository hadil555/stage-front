import { CanActivate, CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { StorageService } from '../demo/service/storage-service.service';

export const LoginGuard = () => {
  const auth = inject(StorageService);
  const router = inject(Router);

  if(auth.isAuthenticated()) {
 
      router.navigateByUrl('/home')
      return false
  }
  return true
}