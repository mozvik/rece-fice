import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-recipe-reviews',
  templateUrl: './recipe-reviews.component.html',
  styleUrls: ['./recipe-reviews.component.scss']
})
export class RecipeReviewsComponent implements OnInit {

  @Input() recipe: Recipe | undefined;

  get userId() {
    return this.authService.user?.userId
  }
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
