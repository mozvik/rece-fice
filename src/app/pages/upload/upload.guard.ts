import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.credentials()
      .pipe(
        map(response => {

          if (!response || response.length === 0) {
          this.authService.user = undefined;
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
