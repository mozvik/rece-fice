import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from '../../service/data.service';

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
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordCheck: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gdpr: new FormControl('', [Validators.required]),
    subscribe: new FormControl(''),
  })

  get email() { return this.registerFormGroup.get('email'); }
  get password() { return this.registerFormGroup.get('password'); }
  get passwordCheck() { return this.registerFormGroup.get('passwordCheck'); }
  get name() { return this.registerFormGroup.get('name'); }
  get gdpr() { return this.registerFormGroup.get('gdpr'); }

  constructor(
    private authService: AuthService
   ) { }

  ngOnInit(): void {
  }

  register() {
    
  }
}

