import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MySnackBarComponent } from '../components/my-snack-bar/my-snack-bar.component';
import { SnackBarInterface } from '../models';


@Injectable({ providedIn: 'root' })
export class SnackBarService {

  static readonly SNACKBAR_DELAY: number = 7000;

  constructor(private matSnackBar: MatSnackBar) { }

  show(messageInfo: SnackBarInterface): void {
    console.log(`SNACK BAR TO OPEN`)
    this.matSnackBar.openFromComponent(MySnackBarComponent, {
      data: {
        message: messageInfo.message,
        color: messageInfo.color
      },
      duration: SnackBarService.SNACKBAR_DELAY,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
