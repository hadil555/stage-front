import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { StorageService } from '../demo/service/storage-service.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent implements OnInit {
    private  username:String;
    constructor(public layoutService: LayoutService, public el: ElementRef, private tokenStorage: StorageService) { }
    ngOnInit(): void {
        
       this.username= this.tokenStorage.getUser().username;
    }

}

