import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsResolverService } from './results-resolver.service';
import { ResultsComponent } from './results.component';
import { ResultsGuard } from './results.guard';

const routes: Routes = [
  {
    path: ':id',
    resolve: { recipes: ResultsResolverService },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    component: ResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsRoutingModule {}
