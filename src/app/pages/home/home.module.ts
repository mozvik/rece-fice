import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HeadlineComponent } from './headline.component';
import { SharedModule } from '../../shared/shared.module';
// import { SearchComponent } from 'src/app/search/search.component';
import { FeaturedComponent } from './featured.component';
// import { SearchComponent } from 'src/app/search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeadlineComponent,
    FeaturedComponent,
    // SearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    //SharedModule
  ]
})
export class HomeModule { }
