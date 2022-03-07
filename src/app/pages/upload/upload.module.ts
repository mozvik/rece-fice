import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { NgxMatFileModule } from 'ngx-mat-file';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    NgxMatFileModule,
    SharedModule
  ]
})
export class UploadModule { }
