import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionsData } from '../interface/options-data';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  public difficultyList: OptionsData[] = [];
  public nationalityList: OptionsData[] = [];
  public labelList: OptionsData[] = [];
  //public displaySize!: number
  public searchIsOpen: boolean = false
  public sidenavOpened: boolean = false;
  public currentScreenSize = new BehaviorSubject<number | undefined>(undefined)  
  //global active Recipe
  public selectedRecipe = new BehaviorSubject<Recipe>(new Recipe());
  
  //searchResults module global data
  public searchResultsShowState: any = {
    state: '',
    value: ''
  }; 
  public searchResultsFull: Recipe[] = [];
  public searchResults: any;
  public searchResultsPageIndex = 0 
  public searchFilters: any = {
    text: '',
    filters: []
  };

  //fridge global data
  public fridgeIngredients: string[] = [];

  //profile module global data
  public activeProfileTab = 0
  public userRecipeList: Recipe[] = []
  public userRecipePageIndex = 0 
  public userFavsRecipePageIndex = 0 
  ///

   // Create a map to display breakpoint names for demonstration purposes.
   displayNameMap = new Map([
    [Breakpoints.XSmall, 0],
    [Breakpoints.Small, 1],
    [Breakpoints.Medium, 2],
    [Breakpoints.Large, 3],
    [Breakpoints.XLarge, 4],
  ]);
  

  constructor(
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
            // this.currentScreenSize = this.displayNameMap.get(query) ?? undefined;
            this.currentScreenSize.next(this.displayNameMap.get(query) ?? undefined)
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
          item.difficulty, item.cost, item.category, item.nationality,
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
