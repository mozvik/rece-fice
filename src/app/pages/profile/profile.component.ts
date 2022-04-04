import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userID = "1"

  constructor(private apiService: APIService,
    public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.userRecipePageIndex = 0
    this.dataService.userRecipeList = []
    // if (this.dataService.userRecipeList.length === 0)
    // {
    this.apiService.getRecipesByUser(this.userID, this.dataService.userRecipePageIndex).subscribe({
      next: (response: any) => {
        this.createRecipes(response?.items)
      }
    })
    // }
  }

  userPageIndexChanged(index: number): void {
    this.apiService.getRecipesByUser(this.userID, index).subscribe({
      next: (response: any) =>  this.createRecipes(response?.items)
    })
  }

  createRecipes(data: any[]): void {
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
    }
    this.dataService.userRecipeList = this.dataService.userRecipeList.concat(array)
    // this.dataService.userRecipes.next(this.dataService.userRecipeList)
  }
}
