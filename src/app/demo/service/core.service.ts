import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {



  constructor(private  dialog: MatDialog,private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
}

Openpopup(employeeId: any, title: any,component:any) {
  var _popup = this.dialog.open(component, {
    width: '50%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      title: title,
      employeeId: employeeId
    }
  });
  _popup.afterClosed().subscribe(item => {
    // console.log(item)
   // this.retrieveEmployees();
  })
}
}
