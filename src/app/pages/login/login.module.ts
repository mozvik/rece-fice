import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

// import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login.component';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    // MatFormFieldModule,
    // MatDividerModule,
    // MatInputModule
  ]
})
export class LoginModule { }
