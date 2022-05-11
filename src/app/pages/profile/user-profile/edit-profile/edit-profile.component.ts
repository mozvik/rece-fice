import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileDialogRef: any

  constructor(@Inject(MAT_DIALOG_DATA) public data:  User) { }

  ngOnInit(): void {
  }
  
}
