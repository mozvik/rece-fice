import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { NgxMatFileModule } from 'ngx-mat-file';
import { SharedModule } from '../../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UploadRoutingModule,
    NgxMatFileModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class UploadModule { }
