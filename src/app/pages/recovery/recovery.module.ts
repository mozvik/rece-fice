import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecoveryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // FormsModule,
    RecoveryRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class RecoveryModule { }
