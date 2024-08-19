import { Component, Inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CoreService } from 'src/app/demo/service/core.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ MatDialogModule,InputTextModule,ToastModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,FlexLayoutModule,
    FormsModule,],
    providers: [MessageService],
    
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent implements OnInit {


 
  confirmButtonText = "Delete"
  cancelButtonText = "Cancel"
  employeeName=""
  constructor(private messageService:MessageService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) 
    
    
    {
   

   
      }
      username:String
  ngOnInit(): void {
    this.username=this.data.username
  }

 

  onConfirmClick(): void {
    console.log(this.employeeName)
    console.log(this.data)

    console.log(this.data.username)
   
     if (this.employeeName === this.data.username) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
     
    }
  
  }

}

