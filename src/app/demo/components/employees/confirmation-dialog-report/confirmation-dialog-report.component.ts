import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-dialog-report',
  standalone:true,
  imports:[MatDialogModule],
  templateUrl: './confirmation-dialog-report.component.html',
  styleUrls: ['./confirmation-dialog-report.component.scss']
})
export class ConfirmationDialogReportComponent {
  message: string = "Are you sure you want to delete this item?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogReportComponent>) 
    
    
    {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }

   
      }

    }

  onConfirmClick(): void {
   
 
      this.dialogRef.close(true);
     
     
    
  
  }


}
