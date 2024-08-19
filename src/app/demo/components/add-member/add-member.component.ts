import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DepartementService } from '../../service/departement.service';
import { EmployeeService } from '../../service/employee.service';
import { StorageService } from '../../service/storage-service.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-member',
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    PasswordModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent  implements OnInit {
  resetPasswordForm = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(120)]],
  
  
    cin :['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9. ()-]{7,25}$/)]],
    departement: this.fb.group({
      id: [2, Validators.required]
    }),
    role:['TeamMember', [Validators.required, Validators.maxLength(50)]]
  });

  id: any;
  selectedrole=''
  services: any[] = [];
  roles= [

  ];
  constructor(private router:Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private authService: DepartementService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
  titleForm="Add New Team Member"
  ngOnInit(): void {
    this.roles  = [
      { name: 'Secretary', code: 2 },
      { name: 'Doctor', code: 1 },
      
  ];
    this.authService.getAll(0, 10).subscribe({
      next: (data: any) => {
        this.services = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error retrieving employees:', error);
      }
    });

    this.id = this.route.snapshot.queryParamMap.get('id');
    console.log("iiiddddddddd",this.id); // do something with deptId
    if (this.id) {
      this.titleForm="Update User Information"
      //load sec data
      this.loadDepartmentData(this.id);
    }
  }
//load sec
  loadDepartmentData(id: number) {
    this.employeeService.get(id).subscribe({
      next: (data: any) => {
        // Remove 'password' field from data
        const { password, ...dataWithoutPassword } = data;
  
        // Patch the form with data except the password field
        this.resetPasswordForm.patchValue(dataWithoutPassword);
      },
      error: (err: any) => {
        console.error('Error loading department data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load department data.' });
      }
    });
  }
  defaultRole=null
loadRoleData(id: Number) {
 this.employeeService.get(id).subscribe({
      next: (data: any) => {
    this.defaultRole=data.roles[0].id
         
      },
      error: (err: any) => {
        console.error('Error loading department data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load department data.' });
      }
    });
  }
  
 /* loadDepartmentData(id: Number) {
    this.employeeService.get(id).subscribe({
      next: (data: any) => {
        this.resetPasswordForm.patchValue(data); // Assuming data matches the structure of resetPasswordForm
      },
      error: (err: any) => {
        console.error('Error loading department data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load department data.' });
      }
    });
  }*/
  save() {
    if (this.id) {
    //  this.loadRoleData(this.id);
    if(this.defaultRole==2){}
    if(this.defaultRole==4){}  
      this.employeeService.update(this.id, this.resetPasswordForm.value).subscribe({
        next: (res: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res });
          this.router.navigateByUrl("/users")
        },
        error: (err: any) => {
          console.error('Error update:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
        }
      });
    } else {
      this.employeeService.create(this.resetPasswordForm.value).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl("/users")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res });
        },
        error: (err: any) => {
          console.error('Error add:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
        }
      });
    }
  }
}
