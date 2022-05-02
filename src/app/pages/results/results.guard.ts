import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsGuard implements CanActivate {
  constructor(private router: Router,
    private dataService: DataService) { }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.dataService.searchResultsFull && this.dataService.searchResultsFull.length > 0) {
          return true;
        } else {
          this.router.navigateByUrl('/home');
          return false;
        }
    }
  
}
