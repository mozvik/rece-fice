import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdatvedelemComponent } from './adatvedelem.component';

const routes: Routes = [{ path: '', component: AdatvedelemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdatvedelemRoutingModule {}
