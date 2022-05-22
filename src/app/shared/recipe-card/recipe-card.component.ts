import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: Recipe | undefined;
  @Input() canEdit: boolean = false;
  @Input() canDelete: boolean = false;
  @Input() small: boolean = false;
  @Output() urlClicked = new EventEmitter<string>();
  @Output() userClicked = new EventEmitter<string>();
  @Output() categoryClicked = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<boolean>();
  @Output() deleteClicked = new EventEmitter<boolean>();

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
  editEmit() {
    this.editClicked.emit(true);
  }
  deleteEmit() {
    this.deleteClicked.emit(true);
  }
}
