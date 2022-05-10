import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileUserRecipeResolverService implements Resolve<Recipe[]> {

  constructor(private apiService: APIService,private dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

  return this.apiService.list('userrecipes', 0, 4, 1)
 }
}
