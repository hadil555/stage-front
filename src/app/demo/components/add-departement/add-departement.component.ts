import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage-service.service';
import { DepartementService } from '../../service/departement.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-departement',
  providers: [MessageService],
  standalone: true,
  imports:[ CommonModule,InputTextModule,ButtonModule,ToastModule,PasswordModule,
    ReactiveFormsModule],
  templateUrl: './add-departement.component.html',
  styleUrl: './add-departement.component.scss'
})
export class AddDepartementComponent implements OnInit{
  resetPasswordForm :FormGroup=this.fb.group({
   // id: [this.storageService.getUser().id,Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
     
    });
    deptId:any
constructor(private router:Router,private route:ActivatedRoute,private storageService:StorageService,private authService:DepartementService,private fb: FormBuilder,private messageService:MessageService){}
  ngOnInit(): void {
     this.deptId = this.route.snapshot.queryParamMap.get('id');
    console.log(this.deptId); // ou faire quelque chose avec deptId
    if (this.deptId) {
      this.loadDepartmentData(this.deptId);
    }
  }
  loadDepartmentData(deptId: string) {
    this.authService.get(deptId).subscribe({
      next: (data: any) => {
        // Assuming the data has 'title' and 'description' fields
        this.resetPasswordForm.patchValue({
          title: data.title,
          description: data.description
        });
      },
      error: (err: any) => {
        console.error('Error loading department data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load department data.' });
      }
    });
  }

changeUserPassword() {
  if (this.deptId) {
    this.authService.update(this.deptId,this.resetPasswordForm.value).subscribe({
      next: (res: any) => {
     
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res });
        this.router.navigateByUrl("/services")
       
        // Handle success, update UI, show success message, etc.
      },
      error: (err: any) => {
        console.error('Error changing password:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      
        // Handle error, display error message, etc.
      }
    });
 }

  else{
    this.authService.create(this.resetPasswordForm.value).subscribe({
      next: (res: any) => {
       
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res });
        this.router.navigateByUrl("/services")
       
        // Handle success, update UI, show success message, etc.
      },
      error: (err: any) => {
        console.error('Error changing password:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      
        // Handle error, display error message, etc.
      }
    });

   
  }
} }
