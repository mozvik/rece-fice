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

@NgModule({
  declarations: [
    DetailsComponent,
    RecipeHeaderComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    // SwiperModule
    CarouselModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule
  ],
  
})
export class DetailsModule { }
