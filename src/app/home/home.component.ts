import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public dataService: UserDataService
  ) { }

  ngOnInit(): void {
    
    
    this.dataService.checkConnection()

    
     this.dataService.getCategoryList('cost')
     this.dataService.getCategoryList('category')
     this.dataService.getCategoryList('difficulity')
     this.dataService.getCategoryList('nationality')
     this.dataService.getCategoryList('label')
    

    //this.dataService.getRecipeSearch("virs",[1,2],[1],[11],[1])
  }

}
