import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public email: string = ''
  public password: string = ''
  public emailError: string = 'errorPlaceholder'
  public passwordError: string = 'errorPlaceholder'
  public checkedGDPR: boolean = false
  public checkedNewsletter: boolean = false


  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    console.log('login init :>> ');
  }

}
