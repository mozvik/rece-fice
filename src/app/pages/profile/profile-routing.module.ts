import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ProfileUserFavsResolverService } from './profile-user-favs-resolver.service';
import { ProfileUserRecipeResolverService } from './profile-user-recipe-resolver.service';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  resolve: {
    userRecipes: ProfileUserRecipeResolverService,
    userFavorites: ProfileUserFavsResolverService,
  },
  runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  component: ProfileComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
