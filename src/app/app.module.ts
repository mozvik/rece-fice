import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule} from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeadlineComponent } from './headline/headline.component';
import { WizardComponent } from './wizard/wizard.component';
import { UploadComponent } from './upload/upload.component';
import { SearchComponent } from './search/search.component';
import { FeaturedComponent } from './featured/featured.component';
import { ResultsComponent } from './results/results.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeadlineComponent,
    WizardComponent,
    UploadComponent,
    SearchComponent,
    FeaturedComponent,
    ResultsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AutoCompleteModule,
    MultiSelectModule,
    DividerModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


  
}
