import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      // if (this.authService.user) {
      //   return true;
      // }
      
      
      return this.authService.credentials()
        .pipe(
          map(response => {
          console.log('credentials response :>> ', response);
          if (!response || response.length === 0) {
            this.router.navigateByUrl('/login');
            return false
          }
          if (!this.authService.user) {
            this.authService.user = new User(response.id, response.name, response.email, '', response.avatar, '', true, response.description, response.created)  
          }
          return true;
         })
    )
  }
  
}
