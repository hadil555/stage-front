import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormLayoutDemoRoutingModule } from '../../uikit/formlayout/formlayoutdemo-routing.module';
import { BadgeModule } from 'primeng/badge';
import { ProjectService } from 'src/app/demo/service/project.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/demo/service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/demo/service/storage-service.service';
@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule,
			ReactiveFormsModule,
			ToastModule,


	BadgeModule,
		FormsModule,
		FormLayoutDemoRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule
],
providers: [MessageService],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit {


    id: any;
    selectedrole=''
    services: any[] = [];
    roles= [

    ];
    constructor(private router:Router,
      private employeeService: ProjectService,
      private route: ActivatedRoute,
      private storageService: StorageService,
      private authService: EmployeeService,
      private fb: FormBuilder,
      private messageService: MessageService
    ) {}
    titleForm="Formualire Facture"
    resetPasswordForm: FormGroup;
    get ligneFactures(): FormArray {
        return this.resetPasswordForm.get('ligneFactures') as FormArray;
      }

   
      submitForm(): void {
        console.log(this.resetPasswordForm.value);
        // Soumettre les données à votre API ou effectuer d'autres actions nécessaires
      }
	  selectedUserIds: number[] = []; 
    ngOnInit(): void {
        this.resetPasswordForm = this.fb.group({
            name: ['', [Validators.required]],
            projectCreator: [0, [Validators.required]],
            startDate: ['', [Validators.required, Validators.maxLength(50)]],
           endDate: ['', [Validators.required]],
           
		   users: [this.selectedUserIds]
          });

      this.authService.getAll().subscribe({
        next: (data: any) => {
          this.services = data;
		  this.updateUserOptions();
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
	  // Getter for convenience
	  get userControls() {
		return this.resetPasswordForm.get('users') as FormArray;
	  } // Method to initialize the form array with user options
	updateUserOptions() {
	  this.services.forEach(user => {
		this.userControls.push(this.fb.group({
		  id: [user.id],
		  username: [user.username]
		}));
	  });
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

   
    save() {
      if (this.id) {
      //  this.loadRoleData(this.id);

        this.employeeService.update(this.id, this.resetPasswordForm.value).subscribe({
          next: (res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res });
            this.router.navigateByUrl("/projects")
       
          },
          error: (err: any) => {
            console.error('Error update:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
          }
        });
      } else {
        this.employeeService.create(this.resetPasswordForm.value).subscribe({
          next: (res: any) => {

      
          },
          error: (err: any) => {
            console.error('Error add:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
          }
        });
      }
    }
  }
