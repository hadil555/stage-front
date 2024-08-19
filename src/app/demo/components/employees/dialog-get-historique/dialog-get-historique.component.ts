import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FormatTimePipe } from 'src/app/pipes/format-time.pipe';
import { CommonModule } from '@angular/common';
import { TimeFormatWithoutSecondPipe } from 'src/app/pipes/time-format-without-second.pipe';
import { MatTableModule } from '@angular/material/table';
import { CheckINCheckOUtService } from 'src/app/demo/service/check-incheck-out.service';

@Component({
  selector: 'app-dialog-get-historique',
  templateUrl: './dialog-get-historique.component.html',
  styleUrls: ['./dialog-get-historique.component.scss'],
  standalone:true,
  imports:[FormatTimePipe,MatDialogModule,CommonModule,TimeFormatWithoutSecondPipe,MatTableModule]
})
export class DialogGetHistoriqueComponent implements OnInit{
  
  displayedColumns: string[] = ['timeUpadting','updatedBy','Date', 'CheckIn','CheckOut','hourType', 'TotalHours'];
  id?:number;
  historique:any[]=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DialogGetHistoriqueComponent>,private checkINCheckOUtService:CheckINCheckOUtService) {}
  ngOnInit(): void {
    console.log(this.data)
 console.log(this.data.checkId);
  this.getHistorique(this.data.checkId)
  
  }
  closePopup() {
    this.ref.close('Closed using function');
  }
  getHistorique(id:number){
 
  
    this.checkINCheckOUtService.getHistorique(id).subscribe({
      next:(response)=> {
       console.log(response)
       this.historique=response
      
      },
      error: (err: any) => {
      
       console.error(err);
      }
    
  });
    
  
  }
  
}
