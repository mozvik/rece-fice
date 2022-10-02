import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividerComponent } from './divider/divider.component';
import { RecipeThumbnailComponent } from './recipe-thumbnail/recipe-thumbnail.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DividerComponent,
    RecipeThumbnailComponent,
    RecipeCardComponent,
    RecipeCardComponent,
  ],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [
    CommonModule,
    DividerComponent,
    RecipeThumbnailComponent,
    RecipeCardComponent,
  ],
})
export class SharedModule {
  // static forRoot() {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [ APIService, DataService, IconService, MessageService ]
  //   };
  // }
}
