import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import {DividerModule} from 'primeng/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeadlineComponent } from './headline/headline.component';
import { WizardComponent } from './wizard/wizard.component';
import { UploadComponent } from './upload/upload.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeadlineComponent,
    WizardComponent,
    UploadComponent,
    AdvancedSearchComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    AutoCompleteModule,
    MultiSelectModule,
    DividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
