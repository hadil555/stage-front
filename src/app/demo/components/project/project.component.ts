import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CoreService } from '../../service/core.service';
import { StorageService } from '../../service/storage-service.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ExperienceDurationPipe } from 'src/app/pipes/experience-duration.pipe';
import { TableDemoRoutingModule } from '../uikit/table/tabledemo-routing.module';

@Component({
  selector: 'app-project',
  providers: [MessageService],
  standalone: true,
  imports: [MatTableModule,DividerModule,CardModule,SidebarModule,TimelineModule,
    PaginatorModule,MatButtonModule, MatTooltipModule,MatIconModule,AvatarModule,
    AvatarGroupModule,ToastModule,
    DialogModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    SplitButtonModule,
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
  CommonModule,
    ButtonModule,
    CommonModule,
		TableDemoRoutingModule,
		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
		MatTableModule,MatButtonModule, MatTooltipModule,MatIconModule,AvatarModule,
    AvatarGroupModule,
    DialogModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    SplitButtonModule,
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
  CommonModule,
    ButtonModule,
    FlexLayoutModule,
    ExperienceDurationPipe ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit{

  regler(id:number){
      this.router.navigateByUrl('/addproject?id='+id)
  }
  constructor(public dialogdelete: MatDialog,private messageService:MessageService,private employeeService: ProjectService,public storageService:StorageService,public dialog: MatDialog,public coreService:CoreService,public router:Router,private formBuilder:FormBuilder)
  { this.retrieveEmployees();
  }

  ngOnInit(): void {

    const accessToken = this.storageService.getAccessToken();
     console.log(accessToken)

         this.retrieveEmployees();


   console.log();
     }
     depts:any[]=[];
     totalRecords: number=0 ;
     subscription: Subscription = new Subscription()
     retrieveEmployees(page: number = 0, size: number = 10): void {

      this.subscription = this.employeeService.getAll(page,size)
        .subscribe({
          next: (data:any) => {

            this.depts = data;
            console.log(data);
          },
          error: (error) => {
            if (error.status === 401) {
              this.router.navigate(['/denied']);
            } else {
              console.error('Error retrieving employees:', error);
            }
          }
        });
    }
    editEmployee(id: any) {
      this.router.navigateByUrl(`/addfacture?id=${id}`);
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
      const dialogRef = this.dialog.open(DialogDeleteComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { id }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteRecord(id);
          this.router.navigateByUrl(`/projects`);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project deleted successfully' });

        }
      });
      this.router.navigateByUrl("/projects")
    }

    deleteRecord(id: number): void {
      this.router.navigateByUrl("/projects")
      // Your delete logic here
      //console.log(`Record with ID ${id} deleted`);
      this.employeeService.delete(id).subscribe({
        next: (res: any) => {

          // Handle success, possibly refresh the employee list
        },
        error: (err: any) => {
          console.error('Error deleting employee:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting ligne' });
        }
      });
    }

    deleteEmployee(id: any) {
    // if (confirm(`Are you sure you want to delete ${username}?`)) {
        this.employeeService.delete(id).subscribe({
          next: (res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee deleted successfully' });
            // Handle success, possibly refresh the employee list
          },
          error: (err: any) => {
            console.error('Error deleting employee:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting employee' });
          }
        });
      }
  }

