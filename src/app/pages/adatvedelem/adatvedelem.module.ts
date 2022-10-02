import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdatvedelemRoutingModule } from './adatvedelem-routing.module';
import { AdatvedelemComponent } from './adatvedelem.component';

@NgModule({
  declarations: [AdatvedelemComponent],
  imports: [CommonModule, AdatvedelemRoutingModule],
})
export class AdatvedelemModule {}
