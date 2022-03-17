import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  selectedId: any
  recipe: Recipe = new Recipe();

  constructor(private route: ActivatedRoute,
    private apiService: APIService) { }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id')
    this.apiService.getRecipes([this.selectedId], 0).subscribe({
      next: (response: any) => {
        if (response.items) {
          const data = response.items[0]
          this.recipe = new Recipe(
            data.recipeId, data.recipeName, data.ingredients, data.directions,
            data.created, data.updated, data.userId, data.cookingTime,
            data.difficulityId, data.costId, data.categoryId, data.nationalityId,
            data.image1,data.image2,data.image3, data.calorie, data.protein, data.carbonhydrate,
            data.fat, data.sugar, data.servings, 
            data.ratings, data.reviews, data.labels
          )
        }
      }
    })
  }
  ngOnDestroy(): void{

    console.log("details destroyed")
  }
}
