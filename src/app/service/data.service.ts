import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { APIService } from './api.service';
import { OptionsData } from '../interface/options-data';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '../classes/recipe';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: any = {
    id: '1',
    name: '', 
    hasUploadAccess: false
  };

  public costList: OptionsData[] = [];
  public categoryList: OptionsData[] = [];
  public difficulityList: OptionsData[] = [];
  public nationalityList: OptionsData[] = [];
  public labelList: OptionsData[] = [];
  public displaySize!: number
  public searchIsOpen: boolean = false
  public sidenavOpened: boolean = false;
  public currentScreenSize: string = ""
  
  //global active Recipe
  public selectedRecipe = new BehaviorSubject<Recipe>(new Recipe());
  
  //searchResults module global data
  public searchResultsFull: Recipe[] = [];
  public searchResultsSimple: any[] = [];
  public searchResultsPageIndex = 0 

  //profile module global data
  public activeProfileTab = 0
  public userRecipeList: Recipe[] = []
  //public userRecipes: Subject<Recipe[]> = new Subject<Recipe[]>()
  //public userRecipes: Observable<Recipe[]> = new Observable<Recipe[]>()
  public userRecipePageIndex = 0 
  public userFavsRecipePageIndex = 0 
  ///

   // Create a map to display breakpoint names for demonstration purposes.
   displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  

  constructor(
    // private apiService: APIService,
    breakpointObserver: BreakpointObserver
  ) {
      breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
    });
   }

  public toggleSearch(): boolean{
    this.searchIsOpen = !this.searchIsOpen
    return this.searchIsOpen
  }
  public toggleSidenav(): boolean{
    this.sidenavOpened = !this.sidenavOpened
    return this.sidenavOpened
  }
  
  public createRecipes(data: any[],): Recipe[] {
    const array: Recipe[] = []
    if (Array.isArray(data)) {
      for (const item of data) {
        const recipe = new Recipe(
          item.recipeId, item.recipeName, item.ingredients, item.directions,
          item.created, item.updated, item.userId, item.cookingTime,
          item.difficulityId, item.costId, item.categoryId, item.nationalityId,
          item.image1, item.image2, item.image3, item.calorie, item.protein, item.carbonhydrate,
          item.fat, item.sugar, item.servings,
          item.ratings, item.reviews, item.labels
        )
        array.push(recipe)
      }
      return array
    }
    return []
  }

  
  
}
