import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { RecipeHeaderComponent } from './recipe-header/recipe-header.component';
// import { SwiperModule } from 'swiper/angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { RecipeDirectionsComponent } from './recipe-directions/recipe-directions.component';
import { RecipeIngredientsComponent } from './recipe-ingredients/recipe-ingredients.component';
import { RecipeNutritionComponent } from './recipe-nutrition/recipe-nutrition.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeSimilarComponent } from './recipe-similar/recipe-similar.component';
import { RecipeRatingsComponent } from './recipe-ratings/recipe-ratings.component';
import { RecipeRateItComponent } from './recipe-rate-it/recipe-rate-it.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DetailsComponent,
    RecipeHeaderComponent,
    RecipeDirectionsComponent,
    RecipeIngredientsComponent,
    RecipeNutritionComponent,
    RecipeSimilarComponent,
    RecipeRatingsComponent,
    RecipeRateItComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule,
    CarouselModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  
})
export class DetailsModule { }
