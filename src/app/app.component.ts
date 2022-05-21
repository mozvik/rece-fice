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
  styleUrls: ['./app.component.scss'],
  animations: [
    // animation triggers go here
  ]
})
export class AppComponent {
  private aaa = this.apiService.isReady.subscribe({
    next: (data: any) => console.log(data),
    error: (err: any) => console.log(err)
  })

  constructor(
    public dataService: DataService, 
    private iconService: IconService,
    private apiService: APIService,
    private authService: AuthService) 
   {
    this.iconService.registerIcons();
    this.authService.credentials()
    .pipe(
      map(response => {
        if (!response || response.length === 0) {
          this.authService.user = undefined;
        } else if (!this.authService.user) {
          
          this.authService.user = new User(response.id, response.name, response.email, '', response.avatar, '', true, response.description, response.created)
        }
      })
    ).subscribe()

  }
  
  ngOnInit(): void {
     //this.onResize()
  }


  // onResize() {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`);
 
  //   const ua = navigator.userAgent;
  //   if (
  //     /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
  //       ua
  //     )
  //   ) {
  //     this.dataService.displaySize = 0; //mobile
  //     return;
  //   }
  //   if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
  //     this.dataService.displaySize = 1; //tablet
  //     return;
  //   }

  //   if (window.innerWidth <= 640) {
  //     this.dataService.displaySize = 0; //mobile
  //   } else if (window.innerWidth <= 768) {
  //     this.dataService.displaySize = 1; //tablet
  //   } else if (window.innerWidth < 1024) {
  //     this.dataService.displaySize = 2; //small screen/laptop
  //   } else if (window.innerWidth <= 1280) {
  //     this.dataService.displaySize = 3; //desktop
  //   } else this.dataService.displaySize = 4; //large screens
  //   return;
  // }
}
