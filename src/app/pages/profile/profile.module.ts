import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DialogDelete, UserRecipesComponent } from './user-recipes/user-recipes.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProfileComponent,
    UserProfileComponent,
    UserRecipesComponent,
    UserFavoritesComponent,
    DialogDelete
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class ProfileModule {

 }
