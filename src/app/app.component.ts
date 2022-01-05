import { Component } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'rece-fice';

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.checkConnection()
    this.dataService.getCategoryList('cost')
    this.dataService.getCategoryList('category')
    this.dataService.getCategoryList('difficulity')
    this.dataService.getCategoryList('nationality')
    this.dataService.getCategoryList('label')
    
    this.onResize()
  }

  onResize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
 
    const ua = navigator.userAgent;
    if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      this.dataService.displaySize = 0; //mobile
      return;
    }
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      this.dataService.displaySize = 1; //tablet
      return;
    }

    if (window.innerWidth <= 480) {
      this.dataService.displaySize = 0; //mobile
    } else if (window.innerWidth <= 768) {
      this.dataService.displaySize = 1; //tablet
    } else if (window.innerWidth < 992) {
      this.dataService.displaySize = 2; //small screen/laptop
    } else if (window.innerWidth <= 1200) {
      this.dataService.displaySize = 3; //desktop
    } else this.dataService.displaySize = 4; //large screens
    return;
  }
}
