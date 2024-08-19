import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';
import { StorageService } from 'src/app/demo/service/storage-service.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppFooterComponent } from 'src/app/layout/app.footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  providers: [MessageService],
  standalone: true,
  imports: [  CommonModule,ToastModule,
  FlexLayoutModule,
  ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit,OnDestroy {
  
  subscription: Subscription = new Subscription()
  passwordVisible: boolean = false;
  valCheck: string[] = ['remember'];
  form: FormGroup; // Change the type to FormGroup

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private messageService: MessageService,
    public layoutService: LayoutService,
    private authService: AuthService,
    private tokenStorage: StorageService,
    private router: Router,
    private fb: FormBuilder  // Inject FormBuilder
  ) {
    this.layoutService = layoutService;
    this.form = this.fb.group({
      username: ['', [Validators.required,this.noWhitespaceValidator]],
      password: ['', Validators.required],
    });
  }
noWhitespaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'noWhitespace': true } : null;
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(): void {
  
          this.router.navigateByUrl('/services');
        
       
            
       
        }

      
      

 

  reloadPage(): void {
    window.location.reload();
  }
  redirect(){
    this.router.navigateByUrl('/recoveraccount')
  }
  signup(){
    this.router.navigateByUrl('/signup')
  }
  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }



}
