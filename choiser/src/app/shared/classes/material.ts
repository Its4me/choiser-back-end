import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class Material {

  constructor(
    private snackBar: MatSnackBar
  ){}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Закрыть', {
      duration: 3500,
    });
  }


}