import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() user: string | undefined
  constructor(public profileDialog: MatDialog) { }

  profileDialogRef: any

  ngOnInit(): void {
  }

  openProfileDialog() {
    this.profileDialogRef = this.profileDialog.open(EditProfileComponent, 
      { data: this.user }
    );

    this.profileDialogRef.afterClosed().subscribe((result: any) => { 
      console.log('result :>> ', result);
    })
  }
}

// @Component({
//   selector: 'edit-profile-dialog',
//   templateUrl: 'edit-profile-dialog.html',
// })
// export class EditProfileDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data:  string) { }
// }