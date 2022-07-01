import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/classes/recipe';
import { User } from 'src/app/classes/user';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userID = "1"

  user: User | undefined
  userRecipes: Recipe[] = []
  userFavorites: Recipe[] = []
  userList: User[] = []
  userRecipePageIndex: number = 0
  userRecipeFavoritesPageIndex: number = 0

  get activeProfileTab() {
    return this.dataService.activeProfileTab
  }
  set activeProfileTab(value: number) {
    this.dataService.activeProfileTab = value
  }
   

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: APIService,
    private dataService: DataService,
    private authService: AuthService) {
    this.activatedRoute.data.subscribe(data => {
      this.userRecipes = this.dataService.createRecipes(data['userRecipes'].items)
      this.userFavorites = this.dataService.createRecipes(data['userFavorites'].items)
      this.userList = data['userList']
    })
    this.user = this.authService.user
  }

  ngOnInit(): void {
  }

  userPageIndexChanged(index: number): void {
    this.apiService.getRecipesByUser(this.userID, index, 4).subscribe({
      next: (response: any) => {
        this.createRecipes(response?.items)
      }
    })
  }

  createRecipes(data: any[]): void {
    const array: Recipe[] = []
    if (Array.isArray(data)) {
      for (const item of data) {
        const recipe = new Recipe(
          item.recipeId, item.recipeName, item.ingredients, item.directions,
          item.created, item.updated, item.userId, item.cookingTime,
          item.difficultyId, item.costId, item.categoryId, item.nationalityId,
          item.image1,item.image2,item.image3, item.calorie, item.protein, item.carbonhydrate,
          item.fat, item.sugar, item.servings,
          item.ratings, item.reviews, item.labels
        )
        array.push(recipe)
      }
    }
    this.dataService.userRecipeList = this.dataService.userRecipeList.concat(array)
  
  }
}
