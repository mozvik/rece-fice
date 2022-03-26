import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './fridge.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FridgeComponent
  ],
  imports: [
    CommonModule,
    FridgeRoutingModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class FridgeModule { }
