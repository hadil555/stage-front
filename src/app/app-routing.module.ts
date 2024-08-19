import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ListComponent } from './demo/components/employees/list/list.component';
import { LoginComponent } from './demo/components/_auth/login/login.component';
import { AuthGuard } from './shared/auth.guard';



import { AdminGuard } from './shared/admin.guard';
import { UserGuard } from './shared/user.guard';


import { AddProjectComponent } from './demo/components/project_manegement/add-project/add-project.component';
import { SettingsComponent } from './settings/settings.component';

import { DepartementComponent } from './demo/components/departement/departement.component';

import { AddDepartementComponent } from './demo/components/add-departement/add-departement.component';









import { AddMemberComponent } from './demo/components/add-member/add-member.component';
import { AddLeadComponent } from './demo/components/add-lead/add-lead.component';
import { ProjectComponent } from './demo/components/project/project.component';

@NgModule({
    imports: [
        RouterModule.forRoot([

            {
                path: '', component: AppLayoutComponent,
              //  canActivate: [AuthGuard],
                children: [
                    //appoin
                    { path: '',component:DepartementComponent},

                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'users', component: ListComponent },
                    { path: 'services', component: DepartementComponent},
                 
                    { path: 'adddept', component: AddDepartementComponent},
                    { path: 'addMember', component: AddMemberComponent},
                    { path: 'addlead', component: AddLeadComponent},
                    { path: 'projects', component: ProjectComponent},
                    { path: 'addproject', component: AddProjectComponent},

                  //  { path: 'projects/add', component: AddProjectComponent },






                ]
            },
         
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', component: NotfoundComponent },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
