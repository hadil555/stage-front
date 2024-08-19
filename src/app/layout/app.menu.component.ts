import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { StorageService } from '../demo/service/storage-service.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    username:String
    constructor(public layoutService: LayoutService,public storageService:StorageService) {
      }
        updateSidebarMenu(role: Number): void {
         
     
          

        

                this.model =   [
                      {label: 'Home Hadil',

                    items: [

                        { label: 'Departements', icon: 'pi pi-home', routerLink: ['/services'] },

                        { label: 'Users', icon: 'pi pi-users', routerLink: ['/users'] },

                        { label: 'Projects', icon: 'pi pi-home', routerLink: ['/projects'] },

                ]
            }]

        
        }
        role=null
    ngOnInit() {
        const authUser = this.storageService.getUser();
        this.username=this.storageService.getUser().username;
        const userRoles = authUser?.roles;
       if( userRoles?.includes('ROLE_ADMIN')){this.role=1}
       if( userRoles?.includes('ROLE_SECRETAIRE')){this.role=2}
       if( userRoles?.includes('ROLE_MEDECIN')){this.role=4}
       if( userRoles?.includes('ROLE_PATIENT')){this.role=3}

        this.updateSidebarMenu(this.role);
        console.log("rolllllllle",this.role)
    }
}
