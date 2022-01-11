import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';

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
import { RegisterComponent } from './register/register.component';
import { SubscribeComponent } from './subscribe/subscribe.component';



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
    RegisterComponent,
    SubscribeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    FileUploadModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


  
}
