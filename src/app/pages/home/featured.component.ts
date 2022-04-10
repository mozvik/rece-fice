import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  recipesLatest: Recipe[] = [];

  constructor(
    private dataService: DataService,
    private apiService: APIService
  ) { }
  
  

  ngOnInit(): void {
      this.getLatest()
  }

  getLatest() {
    this.apiService.getRecipesBy('latest', 1, 4)
      .subscribe({
        next: (response: any) => {
          this.recipesLatest = this.dataService.createRecipes(response)
        console.log('response :>> ', response,this.recipesLatest);}
    })
  }
}
