import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { APIService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsResolverService implements Resolve<any> {
  constructor(private apiService: APIService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const paramsId = route.params['id'];

    if (paramsId) {
      return this.apiService.getRecipe(paramsId);
    }

    return of([]);
  }
}
