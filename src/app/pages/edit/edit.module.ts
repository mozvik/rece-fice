import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { DialogDeleteImage, EditComponent } from './edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileModule } from 'ngx-mat-file';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditComponent,
    DialogDeleteImage,
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMatFileModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule, 
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class EditModule { }
