import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HeadlineComponent } from './headline.component';
// import { SharedModule } from '../../shared/shared.module';
// import { SearchComponent } from 'src/app/search/search.component';
import { FeaturedComponent } from './featured.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
// import { SearchComponent } from 'src/app/search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeadlineComponent,
    FeaturedComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDividerModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class HomeModule { }
