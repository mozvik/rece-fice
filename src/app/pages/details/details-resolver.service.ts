import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsResolverService implements Resolve<any> {

  constructor(
    private authService: AuthService,
    private apiService: APIService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const paramsId = route.params['id'];
    //const id = route.queryParamMap.get('id');
    //console.log('paramsID resolver :>> ', paramsId, id);

    if (paramsId) { 
      return this.apiService.getRecipe(paramsId)
    }
    
    return of([]);
  }
}
