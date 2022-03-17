import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { APIService } from '../../service/api.service';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  searchResults: any;
  pageIndex = 0
  recipes: Recipe[] | undefined;
  
  constructor( public dataService: DataService,
    public apiService: APIService,) { }

  ngOnInit(): void {
    console.log('results Created ');
    this.apiService.searchResultsSubject.subscribe((results) => {
      this.searchResults = results
      
      this.apiService.getRecipes(this.searchResults?.items?.map((item: { recipeId: any; }) => item.recipeId), this.pageIndex).subscribe({
        next: (response: any) => this.createRecipes(response?.items)
      })
    })
    
    this.apiService.detailedRecipesSubject.subscribe((recipes) => {
      this.recipes = recipes
      console.log('recipes :>> ', this.recipes)
    })
  }
  ngOnDestroy(): void{
    this.apiService.detailedRecipesSubject.unsubscribe
    this.apiService.searchResultsSubject.unsubscribe
    console.log("results destroyed")
  }

  createRecipes(data: any[]): Recipe[] {
    const array: Recipe[] = []
    if (Array.isArray(data)) {
      for (const item of data) {
        const recipe = new Recipe(
          item.recipeId, item.recipeName, item.ingredients, item.directions,
          item.created, item.updated, item.userId, item.cookingTime,
          item.difficulityId, item.costId, item.categoryId, item.nationalityId,
          item.image1,item.image2,item.image3, item.calorie, item.protein, item.carbonhydrate,
          item.fat, item.sugar, item.servings, 
          item.ratings, item.reviews, item.labels
        )
        array.push(recipe)
      }
      this.apiService.detailedRecipesSubject.next(array)
      
      console.log('rec array :>> ',data, array);
    }
    


    return [new Recipe()] 
    
    
  }
}
