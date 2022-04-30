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
import { RecipeReviewsComponent } from './recipe-reviews/recipe-reviews.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailsComponent,
    RecipeHeaderComponent,
    RecipeDirectionsComponent,
    RecipeIngredientsComponent,
    RecipeNutritionComponent,
    RecipeSimilarComponent,
    RecipeRatingsComponent,
    RecipeRateItComponent,
    RecipeReviewsComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    FormsModule,
    SharedModule,
    CarouselModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  
})
export class DetailsModule { }
