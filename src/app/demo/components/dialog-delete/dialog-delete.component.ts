import { Component, Inject } from '@angular/core';

import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api/public_api';
@Component({
  selector: 'app-dialog-delete',
  standalone: true,

 // providers: [MessageService],
  imports: [MatDialogModule],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {
 /* constructor( @Inject(MAT_DIALOG_DATA) public data: { id: number },private messageService:MessageService,private router:Router,private serv:EmployeeService,public dialogRef: MatDialogRef<DialogDeleteComponent>) {}

  onOkClick(): void {
    this.serv.delete(this.data.id).subscribe({
      next: (res: any) => {
        this.dialogRef.close(true);
        this.router.navigateByUrl("/services")
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service deleted successfully' });
        // Handle success, possibly refresh the employee list
      },
      error: (err: any) => {
        console.error('Error deleting employee:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting service' });
      }
    });
  }
*/
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Pass false when the user clicks "No"
  }

  onOkClick(): void {
    this.dialogRef.close(true); // Pass true when the user clicks "Ok"
  }
    // Pass true when the user clicks "Ok"
  }

