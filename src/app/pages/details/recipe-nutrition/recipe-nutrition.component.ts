import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-nutrition',
  templateUrl: './recipe-nutrition.component.html',
  styleUrls: ['./recipe-nutrition.component.scss']
})
export class RecipeNutritionComponent implements OnInit {
  
  @Input() recipe: Recipe | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
