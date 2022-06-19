import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  errorAPI: any
  hasAPIErrors: boolean = false
  forgottenPasswordRef: any;

 
  public loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  get email() { return this.loginFormGroup.get('email'); }
  get password() { return this.loginFormGroup.get('password'); }

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialogForgottenPassword: MatDialog
  ) { }


  ngOnInit(): void {
  }

  login() {
    this.isLoading = true;
    
    this.authService.login(this.loginFormGroup.value)
      .subscribe({
      next: response => {
          if (response.hasOwnProperty('errors')) {
            this.isLoading = false
            this.errorAPI = response.errors;
            if (this.errorAPI.hasOwnProperty('lockout')) {
              this.loginFormGroup.controls['email'].setErrors({ emailApi: response.errors.lockout});
            } else {
              this.loginFormGroup.controls['email'].setErrors({ emailApi: response.errors.email});
            }
            this.hasAPIErrors = true
        } else {
          this.authService.user = new User(response.userId, response.name, response.email, response.password, response.avatar, response.role, response.active, response.description, response.created);
          this.router.navigateByUrl('/profile');
        }
      }
    })
  }

  openForgottenPasswordDialog(): void {
    this.forgottenPasswordRef = this.dialogForgottenPassword.open(DialogForgottenPassword);

  }
}

@Component({
  selector: 'dialog-forgotten-password',
  templateUrl: 'dialog-forgotten-password.html',
})
export class DialogForgottenPassword {
  email2: FormControl;
  isLoading: boolean = false;
  apiError: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogForgottenPassword>) {
    this.email2 = fb.control('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required])
  }
  
  checkEmail() {
    this.isLoading = true;
    this.authService.passwordRecovery(this.email2.value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
      response => {
        if (response.hasOwnProperty('errors')) {
          this.apiError = response.errors;
          this.email2.setErrors({ emailApi: response.errors.email});
          return;
        }
        else {
          this.dialogRef.close();
          this.messageService.showSnackBar(`A(z) ${this.email2.value} email címre elküldtük egy visszaigazoló levelet`, 'success');
        }
       }
    )
  }
}