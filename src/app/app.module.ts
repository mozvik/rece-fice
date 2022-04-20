import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APIService } from './service/api.service';
import { DataService } from './service/data.service';
import { IconService } from './service/icon.service';
import { MessageService } from './service/message.service';
// import { RecipeThumbnailComponent } from './components/recipe-thumbnail/recipe-thumbnail.component';



@NgModule({
  declarations: [
    AppComponent,
    // RecipeThumbnailComponent,

  ],
  imports: [
    CoreModule,
    BrowserAnimationsModule,

    //SharedModule.forRoot(),
  ],
  providers: [ APIService, DataService, IconService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
