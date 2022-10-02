import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-directions',
  templateUrl: './recipe-directions.component.html',
  styleUrls: ['./recipe-directions.component.scss'],
})
export class RecipeDirectionsComponent implements OnInit {
  @Input() recipe: Recipe | undefined;

  constructor() {}

  ngOnInit(): void {}
}
