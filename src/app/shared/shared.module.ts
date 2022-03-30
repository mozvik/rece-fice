import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APIService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { IconService } from '../service/icon.service';
import { MessageService } from '../service/message.service';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [
    CommonModule,
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [ APIService, DataService, IconService, MessageService ]                      
    };
  }
 }
