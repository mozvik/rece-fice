import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ResultsComponent,
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ResultsModule { }
