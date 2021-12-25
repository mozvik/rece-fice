import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.dataService.checkConnection()
    // this.dataService.getRecipesBy(3,'category',1)
    //this.dataService.getRecipeSearch("virs",[1,2],[1],[11],[1])
  }

}
