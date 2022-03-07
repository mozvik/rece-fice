import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { APIService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { IconService } from '../service/icon.service';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatIconModule,
    MatAutocompleteModule, MatSidenavModule,
    MatSelectModule, NgxMatSelectSearchModule,
    MatInputModule,MatToolbarModule,
    MatDividerModule, MatMenuModule, MatButtonModule,
    MatCheckboxModule, LayoutModule,
    MatGridListModule, MatStepperModule, 
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [ APIService, DataService, IconService ]                      
    };
  }
 }
