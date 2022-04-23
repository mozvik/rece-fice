import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-ratings',
  templateUrl: './recipe-ratings.component.html',
  styleUrls: ['./recipe-ratings.component.scss']
})
export class RecipeRatingsComponent implements OnInit {

  @Input() recipe: Recipe | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
