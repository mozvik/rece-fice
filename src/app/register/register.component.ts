import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email: string = ''
  public username: string = ''
  public password: string = ''
  public password2: string = ''
  public emailError: string = 'errorPlaceholder'
  public usernameError: string = 'errorPlaceholder'
  public passwordError: string = 'errorPlaceholder'
  public checkedGDPR: boolean = false
  public checkedNewsletter: boolean = false

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
