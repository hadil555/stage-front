import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginatorModule } from 'primeng/paginator';

import { AddEditComponent } from '../add-edit/add-edit.component';


import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationService, MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { CoreService } from 'src/app/demo/service/core.service';
import { EmployeeService } from 'src/app/demo/service/employee.service';
import { StorageService } from 'src/app/demo/service/storage-service.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableDemoRoutingModule } from '../../uikit/table/tabledemo-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';


import { FlexLayoutModule } from '@angular/flex-layout';
import { DepartementService } from 'src/app/demo/service/departement.service';
import { Subscription } from 'rxjs';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ExperienceDurationPipe } from 'src/app/pipes/experience-duration.pipe';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-list',
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
  
  
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit,OnDestroy{

  subscription: Subscription = new Subscription()
  username:String
  id:number
  dateIntegrationAsIntern:any
  sidebarVisible: boolean = false;

  selectedCities: any[]=[];
  selectedStatus: number[] = [];
  selectedDepartments: string[] = [];
  events1:any[]
  numberExperience=''
  dateIntegrationAsEmployee:any=''
  startDateIntegrationAsIntern=''
  endDateIntegrationAsIntern=''
  @ViewChild('dt1') dt1: Table; // Assuming you have a p-table with #dt1 in your HTML
  searchedName: string = ''; // Declare and initialize searchedName



  searchByName(key:any) {
    this.subscription=this.employeeService.searchEmployeesByName(key).subscribe(
      (data: any) => {
        this.employees = data;
        if (this.employees.length === 0) {
          console.log("no data")
          this.messageService.add({ severity: 'warn', summary: 'No Employees Found', detail: 'No employees found with the entered name.' });
        }
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  

  getexperience(id:number,username:String,isIntern:number,dateIntegrationAsEmployee:any,startDateIntegrationAsIntern:any,endDateIntegrationAsIntern:any){
console.log(isIntern)


this.username=username
  this.sidebarVisible = true;
  this.dateIntegrationAsEmployee = dateIntegrationAsEmployee;
this.startDateIntegrationAsIntern=startDateIntegrationAsIntern;
this.endDateIntegrationAsIntern=endDateIntegrationAsIntern}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  applyFilter(){
    this.selectedStatus = this.groupedCities.find(group => group.value === 'Status').items
    .filter(item => this.selectedCities.includes(item.value))
    .map(item => Number(item.value));
  
  this.selectedDepartments = this.groupedCities.find(group => group.value === 'Departement').items
    .filter(item => this.selectedCities.includes(item.value))
    .map(item => item.value as string);  // Optional: If 'Departement' values are expected to be strings
  
this.getFilteredEmployees(this.selectedStatus,this.selectedDepartments,0,10)
  console.log('Selected Status:', this.selectedStatus);
  console.log('Selected Departments:', this.selectedDepartments);
  }
  getFilteredEmployees(selectedStatus,selectedDepartments,page:number,size:number){
  
    this.subscription =this.employeeService.getFilteredEmployees( selectedStatus,selectedDepartments,page,size).subscribe(
    {
      next: (dataFiltred:any) => {
        console.log(this.selectedDepartments)
        console.log(this.selectedStatus)
        this.totalRecords=dataFiltred.totalElements;
        this.employees = dataFiltred.content;
  
        console.log(dataFiltred);
      }}
  )}
    groupedCities = [
          {
              label: 'Position',
              value: 'Status',
              items: [
                  { label: 'Team member', value: 0 },
                  { label: 'Intern', value: 1 }
              ]
          },
          {
              label: 'Departement',
              value: 'Departement',
              items: [
               { label: 'Research and Development', value: 'Research and Development' },
                  { label: 'Data Science', value: 'Data Science' },
                  { label: 'Sales', value: 'Sales' },
                 
              ]
          }
      ];
      departements=[]
     
       
  ///
 
    first: number = 0;

    rows: number = 10;

   
    totalRecords: number=0 ;

   

   

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
  // if(this.rows!=this.totalRecords)
  console.log(this.selectedDepartments)
  console.log(this.selectedStatus)
 if ((this.selectedStatus = []) && (this.selectedDepartments = []))
  {
    this.retrieveEmployees();
   }
   else {
    
    this.getFilteredEmployees(0,this.selectedDepartments,this.first/10,this.rows)
   }
        
    
    }



  separateDialCode = false;

  roles = ['team member', 'user'];
  selectedRole: string;
  

 

  my_input_id = 'your-custom-id'; 

  
  employees:any[]=[];
  items: MenuItem[];
  displayedColumns: string[] = ['fullName','type','Country', 'email','telphoneNumber1' ,'actions'];
  constructor(private messageService:MessageService,private employeeService: EmployeeService,public storageService:StorageService,public dialog: MatDialog,public coreService:CoreService,public router:Router,private formBuilder:FormBuilder) 
  { 
    this.items = [
      {
          label: ' Employee',
           styleClass: "geek",
          icon: 'pi pi-user',
          command: () => {
        this.addEmployee();
          }
      },
      {
          label: ' Intern',
          styleClass: "geek",
          icon: 'pi pi-user',
          command: () => {
           this.addIntern();
          },
         
      }
  ];
}

    
  ngOnInit(): void {

 const accessToken = this.storageService.getAccessToken();
  console.log(accessToken)

      this.retrieveEmployees();
   
    
console.log();
  }
 
  retrieveEmployees(): void {
    this.subscription = this.employeeService.getAll()
      .subscribe({
        next: (data:any) => {
          //this.totalRecords=data.totalElements
          this.employees = data;
          console.log(data);
        },
        error: (error) => {
          if (error.status === 401) {
            this.router.navigate(['/denied']); // Navigate to DeniedComponent
          } else {
            console.error('Error retrieving employees:', error);
          }
        }
      });
  }

  onRemoveEmployee(id:any,fullName:string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { id ,fullName} // Pass the id as data to the dialog
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
       
        this.subscription =  this.employeeService.delete(id).subscribe({
          next: (res:any) => {
            console.log(res);
            
          },
          error: (e:any) => console.error(e)
        });
        
       
      }
    });
    }

  
    addEmployee(){
      this.Openpopup(0, 'Add Employee',AddEditComponent,0);
    }
    addIntern(){
      this.Openpopup(0, 'Add Intern',AddEditComponent,1);
    }
    repport(employeeId:number,username:string){
      console.log(employeeId)

      this.router.navigate(['check'], { queryParams: { id: employeeId } });
    }
  
    
    editEmployee(userId: number) {
      this.router.navigateByUrl(`/addlead?id=${userId}`);
    }
    
    
    Openpopup(employeeId: any, title: any,component:any,isIntern:any) {
      var _popup = this.dialog.open(component, {
        width: '50%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          title: title,
          employeeId: employeeId,
          isIntern: isIntern,

        }
      });
      _popup.afterClosed().subscribe(item => {
        // console.log(item)
        this.retrieveEmployees();
      })
    }
    Openpopup2(employeeId: any, title: any,component:any) {
      var _popup = this.dialog.open(component, {
        width: '50%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          title: title,
          employeeId: employeeId,
        
        }
      });
      _popup.afterClosed().subscribe(item => {
        // console.log(item)
        this.retrieveEmployees();
      })
    }

    check(employeeId:number){
     
      this.router.navigateByUrl('/check')
    }




    openCheckDialog(employeeId:number){
    
  console.log(employeeId)
   //   this.coreService.Openpopup(employeeId, 'Check ',CheckInCheckOutComponent);
  
    
    }
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }


    deleteEmployee(id:number,username:any){

      const dialogRef = this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            employeeId: id,
            username: username // Provide the expected employee name here
          }
        })
      dialogRef.afterClosed().subscribe(result => {
       
        if (result) {
          this.deleteItem(id);
         
        }
        else if(result===false){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The entered name is incorrect' });
  
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Cancel' });
        }
      });
    }
    deleteItem(id: number): void {
     
      ///this.coreService.openSnackBar("Employee deleted successfully!")
      this.subscription = this.employeeService.delete(id).subscribe({
        next:(response)=> {
          this.retrieveEmployees()
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted' });
          console.log('check deleted successfully!', response);
        },
        error: (err: any) => {
         // this.coreService.openSnackBar(" deleted successfully!")
       console.error(err);
        }
      
    });
    }


  
}
