import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public showSnackBar(text: string, state: string = 'info'): void {
    this.snackBar.open(text, '', {
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      panelClass: 'snack-'+state,
      duration: 5000,
    });
  }
}
