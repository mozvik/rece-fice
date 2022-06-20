import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DialogDelete, UserRecipesComponent } from './user-recipes/user-recipes.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';
import { EditAvatarComponent } from './user-profile/edit-avatar/edit-avatar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UnixToDatePipe } from 'src/app/pipes/unix-to-date.pipe';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ProfileComponent,
    UserProfileComponent,
    UserRecipesComponent,
    UserFavoritesComponent,
    DialogDelete,
    EditProfileComponent,
    EditAvatarComponent,
    ManageUsersComponent,
    UnixToDatePipe,
    ManageReviewsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class ProfileModule {

 }
