import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // public emailError: string = 'errorPlaceholder'
  // public passwordError: string = 'errorPlaceholder'
  // public checkedGDPR: boolean = false
  // public checkedNewsletter: boolean = false

  public loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  get email() { return this.loginFormGroup.get('email'); }
  get password() { return this.loginFormGroup.get('password'); }

  constructor(public dataService: DataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('login init :>> ');
  }

}
