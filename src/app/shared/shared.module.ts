import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APIService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { IconService } from '../service/icon.service';
import { MessageService } from '../service/message.service';
import { DividerComponent } from './divider/divider.component';
import { RecipeThumbnailComponent } from './recipe-thumbnail/recipe-thumbnail.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';


@NgModule({
  declarations: [
    DividerComponent,
    RecipeThumbnailComponent,
    RecipeCardComponent,
    RecipeCardComponent
  ],
  imports: [ CommonModule ],
  exports: [
    CommonModule,
    DividerComponent,
    RecipeThumbnailComponent,
    RecipeCardComponent
  ]
})
export class SharedModule {
  // static forRoot() {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [ APIService, DataService, IconService, MessageService ]                      
  //   };
  // }
 }
