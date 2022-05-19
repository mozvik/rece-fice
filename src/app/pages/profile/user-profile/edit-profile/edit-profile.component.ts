import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isLoading: boolean = false;

  public editFormGroup = new FormGroup({
    name: new FormControl(this.user.name, [Validators.required, Validators.minLength(4)]),
    description: new FormControl(this.user.description),
    email: new FormControl(this.user.email, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
    passwordCurrent: new FormControl('', [Validators.required]),
    passwordNew: new FormControl(''),
    passwordNewCheck: new FormControl(''),
    id: new FormControl(this.user.userId),
  },
  {
    validators: (control) => {
      if (control.value.passwordNew !== control.value.passwordNewCheck) {
        control.get("passwordNewCheck")?.setErrors({ notSame: true });
        control.get("passwordNew")?.setErrors({ notSame: true });
      }
      else {
        control.get("passwordNewCheck")?.setErrors(null);
        control.get("passwordNew")?.setErrors(null);
      }
      return null;
    },
  })
  get name() { return this.editFormGroup.get('name'); }
  get passwordNewCheck() { return this.editFormGroup.get('passwordNewCheck'); }
  get description() { return this.editFormGroup.get('description'); }
  get email() { return this.editFormGroup.get('email'); }
  get passwordNew() { return this.editFormGroup.get('passwordNew'); }
  get passwordCurrent() { return this.editFormGroup.get('passwordCurrent'); }

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }
   

  ngOnInit(): void {
  }
  
  update() {
    this.isLoading = true;
    this.authService.userUpdate(this.editFormGroup.value).subscribe({

      next: (res) => {
        this.isLoading = false;
        if (res === null) {
          this.dialogRef.close();
          this.messageService.showSnackBar('Nincs hozzáférésed, jelentkezz be úrjra', 'error');
          this.router.navigateByUrl('/login');
        }

        if (res.hasOwnProperty('errors')) {
          
          for (const key in res.errors) {
            const err: any = {}
            err[key] = res.errors[key]
            
            this.editFormGroup.controls[key].setErrors(err);
            this.editFormGroup.controls[key].markAsTouched();
          }
        }
        else {
          this.authService.user!.name = res.name
          this.authService.user!.email = res.email
          this.authService.user!.description = res.description
          this.messageService.showSnackBar('Sikeres profil módosítás', 'success');
          this.dialogRef.close(true);
        }

      },
      error: (err) => {
        this.isLoading = false;
      }
    }
      );
  }
  
}
