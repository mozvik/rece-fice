import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload.component';
import { UploadGuard } from './upload.guard';

const routes: Routes = [{
  path: '',
  canActivate: [UploadGuard],
  component: UploadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
