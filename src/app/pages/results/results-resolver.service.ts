import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsResolverService implements Resolve<Recipe[]> {

  constructor(private apiService: APIService,private dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const paramsId = route.params['id']
    console.log('paramsId :>> ', paramsId,route);
    if (paramsId) {
      if (this.apiService.listType.filter((type) => type.id === paramsId).length > 0) {
        return this.apiService.list(paramsId, 0, 4)
      }

      if (paramsId === 'search' && (this.dataService.searchFilters.text !== '' || this.dataService.searchFilters.advanced)) {

          return this.apiService.search(this.dataService.searchFilters.text,this.dataService.searchFilters.filters, 0, 4)
        }
      
      if (paramsId === 'fridge' && this.dataService.fridgeIngredients.length > 0) {
        return this.apiService.fridge(this.dataService.fridgeIngredients, 0)
      }
    }
    return []
  }
}
