import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryResolverService } from './recovery-resolver.service';
import { RecoveryComponent } from './recovery.component';

const routes: Routes = [
  {
    path: '',
    component: RecoveryComponent,
    resolve: {
      token: RecoveryResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryRoutingModule {}
