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
  recipesFree: Recipe[] = [];
  recipesDaily: Recipe[] = [];

  constructor(
    private dataService: DataService,
    private apiService: APIService
  ) { }
  
  

  ngOnInit(): void {
    this.getLatest()
    this.getFree()
    this.getDaily()
  }

  getLatest() {
    this.apiService.getRecipesBy('latest', 1, 4)
      .subscribe({
        next: (response: any) => {
          this.recipesLatest = this.dataService.createRecipes(response)
            
        }
    })
  }
  getFree() {
    this.apiService.getRecipesBy('free', 1, 4)
      .subscribe({
        next: (response: any) => {
          this.recipesFree = this.dataService.createRecipes(response)
        
        }
    })
  }
  getDaily() {
    this.apiService.getRecipesBy('daily', 1, 4)
      .subscribe({
        next: (response: any) => {
          this.recipesDaily = this.dataService.createRecipes(response)
        }
    })
  }
}
