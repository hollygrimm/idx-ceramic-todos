import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarInterface } from '../../models';

@Component({
  selector: 'app-my-snack-bar',
  templateUrl: './my-snack-bar.component.html',
  styleUrls: ['./my-snack-bar.component.scss']
})
export class MySnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: SnackBarInterface) { }
}