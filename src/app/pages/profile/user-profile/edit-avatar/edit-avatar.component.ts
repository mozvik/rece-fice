import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss']
})
export class EditAvatarComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,

  ) {
    
     }

  ngOnInit(): void {
    console.log('data :>> ', this.data);
  }

}
