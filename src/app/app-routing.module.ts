import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsResolverService } from './pages/details/details-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./pages/upload/upload.module').then((m) => m.UploadModule),
  },
  {
    path: 'fridge',
    loadChildren: () =>
      import('./pages/fridge/fridge.module').then((m) => m.FridgeModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./pages/results/results.module').then((m) => m.ResultsModule),
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
    resolve: { recipe: DetailsResolverService },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./pages/edit/edit.module').then((m) => m.EditModule),
  },
  {
    path: 'recovery/:token',
    loadChildren: () =>
      import('./pages/recovery/recovery.module').then((m) => m.RecoveryModule),
  },
  {
    path: 'adatvedelem',
    loadChildren: () =>
      import('./pages/adatvedelem/adatvedelem.module').then(
        (m) => m.AdatvedelemModule
      ),
  },

  {
    path: '**',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
