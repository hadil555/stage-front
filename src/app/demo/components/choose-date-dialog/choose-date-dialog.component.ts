import { Component, Inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-choose-date-dialog',

  templateUrl: './choose-date-dialog.component.html',
  styleUrl: './choose-date-dialog.component.scss',

  standalone: true,
  imports: [CommonModule,FlexLayoutModule,MatNativeDateModule,MatDatepickerModule,MatDatepickerModule,
FormsModule,
MatFormFieldModule,
    MatInputModule,
    ToastModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CalendarModule,
    ButtonModule,

  ],
  providers: [  
    MatDatepickerModule,MessageService,MatDatepickerModule,
    MatNativeDateModule   
  ]
})
export class ChooseDateDialogComponent {
  condition: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<ChooseDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
 
  onNoClick(): void {
    this.dialogRef.close();
   //   this.data.startDate2= this.adjustDate(this.data.startDate2)
      //this.data.endDate2= this.adjustDate(this.data.endDate2)
  }
}
