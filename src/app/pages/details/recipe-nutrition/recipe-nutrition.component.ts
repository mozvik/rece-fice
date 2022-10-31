import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-nutrition',
  templateUrl: './recipe-nutrition.component.html',
  styleUrls: ['./recipe-nutrition.component.scss'],
})
export class RecipeNutritionComponent implements OnInit {
  @Input() recipe: Recipe | undefined;

  constructor() {}

  ngOnInit(): void {}

  elementQuantity(element: any): string {
    if (element.name == 'Kalória') {
      return element.quantity + ' kcal';
    } else {
      return element.quantity + ' gramm';
    }
  }
}
