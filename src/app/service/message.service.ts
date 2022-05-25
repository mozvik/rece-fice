import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable(
  { providedIn: 'root' }
)
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * 
   * @param text üzenet szövege
   * @param state üzenet státusza (success, error, -warning-, info)
   */
  public showSnackBar(text: string, state: string = 'info', duration: number = 7000): void {
    this.snackBar.open(text, '', {
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      panelClass: 'snack-'+state,
      duration: duration,
    });
  }
}
