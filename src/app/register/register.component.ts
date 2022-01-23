import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // public email: string = ''
  // public username: string = ''
  // public password: string = ''
  // public password2: string = ''
  // public emailError: string = 'errorPlaceholder'
  // public usernameError: string = 'errorPlaceholder'
  // public passwordError: string = 'errorPlaceholder'
  // public checkedGDPR: boolean = false
  // public checkedNewsletter: boolean = false

  public registerFormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gdpr: new FormControl('', [Validators.required]),
    newsletter: new FormControl(''),
  })

  get email() { return this.registerFormGroup.get('email'); }
  get password() { return this.registerFormGroup.get('password'); }

  constructor(public dataService: DataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
