import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-reviews',
  templateUrl: './recipe-reviews.component.html',
  styleUrls: ['./recipe-reviews.component.scss']
})
export class RecipeReviewsComponent implements OnInit {

  @Input() recipe: Recipe | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
