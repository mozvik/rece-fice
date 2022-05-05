import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: Recipe | undefined;
  @Output() urlClicked = new EventEmitter<string>();
  @Output() userClicked = new EventEmitter<string>();
  @Output() categoryClicked = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }

  urlEmit(id: string) { 
    this.urlClicked.emit(id);
  }
  userEmit(id: string) {
    this.userClicked.emit(id);
  }
  categoryEmit(id: string) {
    this.categoryClicked.emit(id);
  }
}
