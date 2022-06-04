import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  tokenError: string | undefined;
  hasAPIErrors: boolean = false;
  errorAPI: any;
  token: string = '';
  isLoading: boolean = false;

  public resetPasswordFormGroup = new FormGroup({
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  },
  {
    validators: (control) => {
      if (control.value.password1 !== control.value.password2) {
        control.get("password2")?.setErrors({ notSame: true });
        control.get("password1")?.setErrors({ notSame: true });
      }
      else {
        control.get("password2")?.setErrors(null);
        control.get("password1")?.setErrors(null);
      }
      return null;
    },
  })
  //Validators.minLength(8)

  get password1() { return this.resetPasswordFormGroup.get('password1'); }
  get password2() { return this.resetPasswordFormGroup.get('password2'); }

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .subscribe(
        data => {
          if (data['token'] && data['token'].hasOwnProperty('error')) {
            this.tokenError = data['token'].error;
          }
          else if(data['token'] && data['token'].hasOwnProperty('token')) {
            this.token = data['token'].token;
          }
        })
  }

  reset() {
    this.isLoading = true;
    this.authService.resetPassword(this.token, this.resetPasswordFormGroup.controls['password1'].value, this.resetPasswordFormGroup.controls['password2'].value)
      .pipe(
        finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: response => {
        if (response.hasOwnProperty('errors')) {
          this.errorAPI = response.errors;

          this.resetPasswordFormGroup.controls['password1'].setErrors({ pwApi: response.errors.password1 });
          this.resetPasswordFormGroup.controls['password2'].setErrors({ pwApi: response.errors.password2});
          this.hasAPIErrors = true
        } else {
          this.messageService.showSnackBar(response, 'success');  
          this.router.navigateByUrl('/login');
        }
      }
    })
    
   }
}
