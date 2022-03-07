import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './fridge.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FridgeComponent
  ],
  imports: [
    CommonModule,
    FridgeRoutingModule,
    SharedModule
  ]
})
export class FridgeModule { }
