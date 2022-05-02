import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results.component';
import { ResultsGuard } from './results.guard';

const routes: Routes = [{
  path: '',
  canActivate: [ResultsGuard],
  component: ResultsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
