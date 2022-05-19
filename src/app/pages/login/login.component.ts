import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  errorAPI: any
  hasAPIErrors: boolean = false
 
  // public emailError: string = 'errorPlaceholder'
  // public passwordError: string = 'errorPlaceholder'
  // public checkedGDPR: boolean = false
  // public checkedNewsletter: boolean = false
  // public checkedTerms: boolean = false


  public loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  get email() { return this.loginFormGroup.get('email'); }
  get password() { return this.loginFormGroup.get('password'); }

  constructor(
    private router: Router,
    private authService: AuthService,
    //private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    console.log('login init :>> ');
  }

  login() {
    this.isLoading = true;
    
    this.authService.login(this.loginFormGroup.value)
      .subscribe({
      next: response => {
        if (response.hasOwnProperty('errors')) {
          this.isLoading = false
          this.errorAPI = response.errors;
          console.log('object :>> ',response.errors);
          
          this.loginFormGroup.controls['email'].setErrors({ emailApi: response.errors.email});
          this.hasAPIErrors = true
        } else {
          console.log('LOGIN response :>> ', response);
          this.authService.user = new User(response.userId, response.name, response.email, response.password, response.avatar, response.role, response.active, response.description, response.created);
          this.router.navigateByUrl('/profile');
        }
      },
      error: error => {
        console.log('login error :>> ', error);
       }
    })
  }
}
