import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  isLoading: boolean = false;
  errorAPI: any
  hasAPIErrors: boolean = false

  public registerFormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passwordNew: new FormControl(''),
    passwordConfirm: new FormControl(''),
    gdpr: new FormControl('', [Validators.required]),
    subscribe: new FormControl(''),
  },
  {
    validators: (control) => {
      if (control.value.passwordNew !== control.value.passwordConfirm) {
        control.get("passwordNew")?.setErrors({ notSame: true });
        control.get("passwordConfirm")?.setErrors({ notSame: true });
      }
      else {
        control.get("passwordNew")?.setErrors(null);
        control.get("passwordConfirm")?.setErrors(null);
      }

      if (control.value.passwordNew.length < 8) {
        control.get("passwordNew")?.setErrors({ minlength: "error" });
      }
      if (control.value.passwordConfirm.length < 8) {
        control.get("passwordConfirm")?.setErrors({ minlength: "error" });
      }
      return null;
    },
  })

  get email() { return this.registerFormGroup.get('email'); }
  get passwordNew() { return this.registerFormGroup.get('passwordNew'); }
  get passwordConfirm() { return this.registerFormGroup.get('passwordConfirm'); }
  get name() { return this.registerFormGroup.get('name'); }
  get gdpr() { return this.registerFormGroup.get('gdpr'); }

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
   ) { }

  ngOnInit(): void {
  }

  register() {
    this.isLoading = true;
    this.authService.register(this.registerFormGroup.value)
    .pipe(
      finalize(() => this.isLoading = false)  
    )
    .subscribe(
      {
        next: res => {
            if (res.hasOwnProperty('errors')) {
            for (const key in res.errors) {
              const err: any = {}
              err[key] = res.errors[key]
              
              this.registerFormGroup.controls[key].setErrors(err);
              this.registerFormGroup.controls[key].markAsTouched();
            }
            }  else {
              this.messageService.showSnackBar('Sikeres regisztráció. Lépj be a fiókodba.', 'success');
              this.router.navigateByUrl('/login');
            }

          
        },
        error: error => {
          this.messageService.showSnackBar('Sikertelen regisztráció.', 'error'); 
          
         }
      }

    )
  }
}

