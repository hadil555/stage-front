import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from 'src/app/demo/service/core.service';
import { EmployeeService } from 'src/app/demo/service/employee.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

import { DepartementService } from 'src/app/demo/service/departement.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,PasswordModule,
  //  DashboardModule,
    HttpClientModule,CalendarModule,MatInputModule,ToastModule,InputTextModule,DropdownModule,
    MatSelectModule,
    FormsModule,FlexLayoutModule,CommonModule],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  providers: [MessageService,DatePipe]
})
export class AddEditComponent implements OnInit,OnDestroy {
 
  subscription: Subscription = new Subscription()
  departements = [
   
];



selectedCity: any | undefined;

  myInputId = 'my-input-id';


phoneForm = this.formBuilder.group({
    phone: ['', [Validators.required]]
  });
  id: string = '';
  my_input_id = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<AddEditComponent>, private formBuilder: FormBuilder,
  private employeeService: EmployeeService,private datePipe:DatePipe,private coreService:CoreService,private departementService:DepartementService,private messageService: MessageService) {}
  
  editdata:any; 
  inputdata:any

 
  myform = this.formBuilder.group({
    username: ['', [Validators.required, 
                   Validators.minLength(4),
                   Validators.maxLength(32)]],

     email: [''],
    password: [''],
    departement:['',[Validators.required]],
    isIntern:[1,Validators.required],
    dateIntegrationAsEmployee:[],
    startDateIntegrationAsIntern:[],
    endDateIntegrationAsIntern:[]
  });
  
  validateEmail(control: { value: string; }) {
    const email = control.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
 
    if (email.endsWith('@majesteye.com')) {

      return null; // Valid email
    } else {
      return { invalidEmail: true }; // Invalid email
    }
}
ngOnInit(): void {
   // Set the default selected department
   if (this.editdata && this.editdata.departement) {
    this.myform.get('departement')?.patchValue(this.editdata.departement.id);
    console.log("mydept",this.myform.get('departement'))}

  this.departements = [
    { id: 1, title: 'Data Science' },
    { id: 2, title: 'Reaserch and Dev' },
    { id: 3, title: 'Sales' },
   
  ];

  
  
 
  
  console.log("isIntern",this.data.isIntern)
  if (this.data.isIntern == 1) {
    this.myform.get('email')?.setValidators([Validators.required, Validators.email]);
  } else {
    this.myform.get('email')?.setValidators([
      Validators.email,
      this.validateEmail.bind(this)  
    ]);
  }
 
   
  this.inputdata = this.data;
  console.log("bara",this.data)
 
  this.myform.patchValue({
   // departement:this.data.departement,
    isIntern: this.data.isIntern
  
  });

  if(this.data.employeeId>0){
   
  
    console.log(this.data)
    this.setpopupdata(this.inputdata.employeeId)
  }

  
}/*
getAllDepartements(){
  this.departementService.getAllDepartements().subscribe({
    next: (departements) => {
     
      console.log(departements)
      this.departements=departements
    }
  });}*/


setpopupdata(employeeId: number) {
  // Check if 'endtDateIntegrationAsIntern' property exists in 'editdata'


  this.subscription= this.employeeService.get(employeeId).subscribe(item => {
    this.editdata = item;
    console.log('Patch Value:', this.editdata.startDateIntegrationAsIntern);
    console.log('dept Value:', this.editdata.departement);
    console.log('dep Value:', this.editdata.departement.title);
  this.myform.patchValue({
    username: this.editdata.username,
    departement: this.editdata.departement,
    email: this.editdata.email,
    password: this.editdata.password,
    isIntern: this.editdata.isIntern,
    dateIntegrationAsEmployee: this.editdata.dateIntegrationAsEmployee,
    startDateIntegrationAsIntern: this.editdata.startDateIntegrationAsIntern,
    endDateIntegrationAsIntern: this.editdata.endDateIntegrationAsIntern  // Provide a default value or null
  });
   // Check if startDateIntegrationAsIntern is not null or undefined
   if ((this.editdata.startDateIntegrationAsIntern)&&(this.editdata.endDateIntegrationAsIntern)) {
  const dateString = this.editdata.startDateIntegrationAsIntern;
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is zero-based in JavaScript
  const day = parseInt(dateParts[2], 10);
  
  const startDate = new Date(year, month, day);
  

  const dateStringendDate = this.editdata.endDateIntegrationAsIntern;
  const datePartsendDate = dateStringendDate.split('-');
  const yearendDate = parseInt(datePartsendDate[0], 10);
  const monthendDate = parseInt(datePartsendDate[1], 10) - 1; // Month is zero-based in JavaScript
  const dayendDate = parseInt(datePartsendDate[2], 10);
  
  const endDate = new Date(yearendDate, monthendDate, dayendDate);
  // Set the value in the form control
  this.myform.get('startDateIntegrationAsIntern').setValue(startDate);
  this.myform.get('endDateIntegrationAsIntern').setValue(endDate);
//  this.myform.get('departement').setValue(dept);

   }
   // Handle department separately
   if (this.editdata.departement) {
    this.myform.get('departement').setValue(this.editdata.departement.id); // Assuming 'departement' should be just the id
  }
});

}


private formatDate(date: Date | null | undefined): string {
    
  const safeDate = date || null;
  return safeDate ? this.datePipe.transform(safeDate, 'yyyy-MM-dd') || '' : '';
}
private adjustDate(date: Date): Date {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + 1); // Add one day
  return adjustedDate;
}
  save(): void {
// Adjust the start and end dates if needed
if (this.myform.value.startDateIntegrationAsIntern) {
  this.myform.patchValue({
    startDateIntegrationAsIntern: this.adjustDate(this.myform.value.startDateIntegrationAsIntern),
  });
}

if (this.myform.value.endDateIntegrationAsIntern) {
  this.myform.patchValue({
      endDateIntegrationAsIntern: this.adjustDate(this.myform.value.endDateIntegrationAsIntern),
  });
}



const now= new Date;

    this.myform.patchValue({
      isIntern: this.data.isIntern,

    });
  
   
  

    if (this.data.employeeId > 0) {
    
      // If data exists and has employeeId, it means it's an edit operation
      this.subscription=this.employeeService.update(this.data.employeeId, this.myform.value)
        .subscribe({
          next: (val: any) => {
            this.closePopup();
            
        
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee updated successfully' });
 
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    } else {
      
    const now = new Date();

    // Extracting date 
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(now.getDate()).padStart(2, '0');
    
   const formattedDate = `${year}-${month}-${day}`;
      if (this.myform.value.isIntern === 0) {
        this.myform.patchValue({
          dateIntegrationAsEmployee: formattedDate
        });
      }
      
  
      
    
      this.subscription= this.employeeService.create(this.myform.value)
      .subscribe({
     
    next: (val: any) => {
    
     this.closePopup();
   
     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee added successfully' });
 
    },
    error: (err: any) => {
      console.error(err);
    },
  });}}
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  closePopup() {
    this.ref.close('Closed using function');
    //this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Cancel' });
 
  }


}
