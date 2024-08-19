import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/demo/service/storage-service.service';

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
})
export class AccessComponent implements OnInit{ 
    isAdmin:any
constructor(private storageService:StorageService){}
ngOnInit(): void {
    const authUser = this.storageService.getUser();
    const userRoles = authUser?.roles;
     this.isAdmin = userRoles?.includes('ROLE_ADMIN');   
}
   
  
}
