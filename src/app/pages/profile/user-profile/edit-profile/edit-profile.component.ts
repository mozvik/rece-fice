import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileDialogRef: any
  hasAPIErrors: boolean = false
  isLoading: boolean = false;

  public editFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
    passwordOld: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  })
  get name() { return this.editFormGroup.get('name'); }
  get password2() { return this.editFormGroup.get('password2'); }
  get description() { return this.editFormGroup.get('description'); }
  get email() { return this.editFormGroup.get('email'); }
  get password() { return this.editFormGroup.get('password'); }
  get passwordOld() { return this.editFormGroup.get('passwordOld'); }

  constructor(@Inject(MAT_DIALOG_DATA) public user: User) {
    
   }

  ngOnInit(): void {
  }
  
}
