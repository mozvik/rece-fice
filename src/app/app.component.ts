import { Component } from '@angular/core';
import { map } from 'rxjs';
import { User } from './classes/user';
import { APIService } from './service/api.service';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { IconService } from './service/icon.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public dataService: DataService, 
    private iconService: IconService,
    private authService: AuthService) 
   {
    this.iconService.registerIcons();
    this.authService.credentials()
    .pipe(
      map(response => {
        if (!response || response.length === 0) {
          this.authService.user = undefined;
        } else if (!this.authService.user) {
          this.authService.user = new User(response.id, response.name, response.email, response.password, response.avatar, response.role, response.active, response.description, response.created);
        }
      })
    ).subscribe()

  }
  
  ngOnInit(): void {
  }

}
