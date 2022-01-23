import { Component } from '@angular/core';
import { APIService } from './service/api.service';
import { DataService } from './service/data.service';
import { IconService } from './service/icon.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // animation triggers go here
  ]
})
export class AppComponent {
  private aaa: any[] = []
  constructor(
    public dataService: DataService, 
    private iconService: IconService,
    private apiService: APIService,
  ) {
    this.iconService.registerIcons();
  }
  
  ngOnInit(): void {
    this.dataService.checkConnection()

    this.apiService.categories.subscribe(response => {
      this.dataService.categoryList = response.items
    })
    this.apiService.difficulities.subscribe(response => {
      this.dataService.difficulityList = response.items
    })
   
    this.apiService.costs.subscribe(response => {
      this.dataService.costList = response.items
    })

    this.apiService.nationalities.subscribe(response => {
      this.dataService.nationalityList = response.items
    })

    this.apiService.labels.subscribe(response => {
      this.dataService.labelList = response.items
    })

    this.apiService.getCategories()
    this.apiService.getCosts()
    this.apiService.getDifficulities()
    this.apiService.getNationalities()
    this.apiService.getLabels()
    
    // this.apiService.getDiff().subscribe(response => {
    //   this.dataService.difficulityList = response
     
    // })

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

    if (window.innerWidth <= 640) {
      this.dataService.displaySize = 0; //mobile
    } else if (window.innerWidth <= 768) {
      this.dataService.displaySize = 1; //tablet
    } else if (window.innerWidth < 1024) {
      this.dataService.displaySize = 2; //small screen/laptop
    } else if (window.innerWidth <= 1280) {
      this.dataService.displaySize = 3; //desktop
    } else this.dataService.displaySize = 4; //large screens
    return;
  }
}
