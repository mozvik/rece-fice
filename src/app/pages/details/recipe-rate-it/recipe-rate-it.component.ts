import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-rate-it',
  templateUrl: './recipe-rate-it.component.html',
  styleUrls: ['./recipe-rate-it.component.scss']
})
export class RecipeRateItComponent implements OnInit {

  @Output() rating = new EventEmitter<number>();

  ratings: number[] = [0, 0, 0, 0, 0];

  constructor() { }

  ngOnInit(): void {
  }

  toggleStar(index: number) {
    
    this.ratings = this.ratings.map(
      (rating, i) => {
        if (i <= index) {
          rating = 1;
        } else {
          rating = 0;
        }
        return rating;
      }
    )

    this.rating.emit(index + 1);
  }
}
