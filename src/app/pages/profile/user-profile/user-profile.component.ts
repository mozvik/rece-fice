import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';
import { EditAvatarComponent } from './edit-avatar/edit-avatar.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User | undefined
  constructor(public profileDialog: MatDialog) { }

  profileDialogRef: any
  avatarDialogRef: any

  ngOnInit(): void {
  }

  openEditProfileDialog() {
    this.profileDialogRef = this.profileDialog.open(EditProfileComponent, 
      { data: this.user }
    );

    this.profileDialogRef.afterClosed().subscribe((result: any) => { 
      console.log('result :>> ', result);
    })
  }

  openEditAvatarDialog() {
    console.log('this.user :>> ', this.user);
    this.avatarDialogRef = this.profileDialog.open(EditAvatarComponent, 
      { data: this.user }
    );

    this.avatarDialogRef.afterClosed().subscribe((result: any) => { 
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