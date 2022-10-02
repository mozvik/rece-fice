import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
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

  constructor(private apiService: APIService, private router: Router) {}

  ngOnInit(): void {}

  urlEmit(id: string) {
    this.urlClicked.emit(id);
  }
  userEmit(id: string) {
    this.userClicked.emit(id);
  }
  categoryEmit(id: string) {
    this.categoryClicked.emit(id);

    const catType = this.apiService.listType.find(
      (type) => type.name.toLowerCase() === id
    );

    if (catType) {
      this.router.navigateByUrl(`/results/${catType.id.toLowerCase()}`);
    }
  }
  editEmit() {
    this.editClicked.emit(true);
  }
  deleteEmit() {
    this.deleteClicked.emit(true);
  }
}
