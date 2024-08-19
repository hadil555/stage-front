import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../demo/service/auth.service';
import { StorageService } from '../demo/service/storage-service.service';
// Update this with the correct path to your AuthService

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdmin:any
  constructor(private storageService: StorageService, private router: Router) {
    const authUser = this.storageService.getUser();
 // this.username=this.storageService.getUser().username;
  const userRoles = authUser?.roles;
   this.isAdmin = userRoles?.includes('ROLE_ADMIN');

  }
  
  canActivate(): boolean {
    if (this.isAdmin) {
      return true;
    } else {
      console.log("forbidden")
      this.router.navigate(['/auth/access']);
      return false;
    }
  }
}
