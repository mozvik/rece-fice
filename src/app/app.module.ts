import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APIService } from './service/api.service';
import { DataService } from './service/data.service';
import { IconService } from './service/icon.service';
import { MessageService } from './service/message.service';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './service/error-intercept';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserAnimationsModule,

    //SharedModule.forRoot(),
  ],
  providers: [
    APIService,
    DataService,
    IconService,
    MessageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
