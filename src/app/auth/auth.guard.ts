import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../classes/user';
import { AuthService } from '../service/auth.service';
import { MessageService } from '../service/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.credentials().pipe(
      map((response) => {
        if (!response || response.length === 0) {
          this.authService.user = undefined;
          this.messageService.showSnackBar(
            'Hozzáférés megtagadva. A szolgáltatás igénybevételéhez bejelentkezés szükséges',
            'error'
          );
          this.router.navigateByUrl('/login');
          return false;
        }
        if (!this.authService.user) {
          this.authService.user = new User(
            response.userId,
            response.name,
            response.email,
            response.password,
            response.avatar,
            response.role,
            response.active,
            response.description,
            response.created,
            response.totalReviews,
            response.totalRecipes,
            response.totalFavorites
          );
        }
        return true;
      })
    );
  }
}
