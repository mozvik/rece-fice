import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileManageUsersResolverService implements Resolve<User[]> {
  constructor(private authService: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User[] | Observable<User[]> | Promise<User[]> {
    return this.authService.user?.role == '1' ? this.authService.userlist():[];
  }
}
