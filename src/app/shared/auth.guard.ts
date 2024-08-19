import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../demo/service/storage-service.service';


export const  AuthGuard  = () => {
  const auth = inject(StorageService);
  const router = inject(Router);

  if(!auth.getToken()) {
      router.navigateByUrl('/services')
      return false
  }
  return true}