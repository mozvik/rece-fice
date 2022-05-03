import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { APIService } from '../../service/api.service';
import { Subject, switchMap } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { trigger } from '@angular/animations';
import { hoverImageAnimation, listAnimation, scaleEnterAnimation } from 'src/app/animations';
import { OptionsData } from 'src/app/interface/options-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [
    // trigger(
    //   'enterAnimation', scaleEnterAnimation
    // )
    listAnimation
  ]
})
export class ResultsComponent implements OnInit {

  categories: OptionsData[] = [];
  results: Recipe[] = [];
  state: string = '';
  searchFilters: any = {
    text: '',
    filters: []
  };
  //showImgOverlay: boolean[] = [];
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dataService: DataService,
    public apiService: APIService,) {
    
    this.apiService.categories.subscribe((categories) => this.categories = categories);
    
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.state = params['id']
          console.log('objethis.activatedRoute.paramsct :>> ', this.activatedRoute.params);
          return this.activatedRoute.data;
        })
    ).subscribe({
      next: data => {
        this.results = this.dataService.createRecipes(data['recipes'].items)
        console.log('data :>> ', data);
      },
      error: err => {
        this.router.navigate(['/home']);
       }
    })}

  ngOnInit(): void {
    
    

  }

  navigateToDetails(id: string) { 
    this.router.navigateByUrl(`/details/${id}`)
  }

  navigateToUserProfile(id: string) { 

  }
  navigateToCategory(id: string) { 

  }

  incrementIndex(): void {
    this.dataService.resultsPageIndex++

    if (this.state === 'search') {
      this.getRecipesFromSearch()
    }
    else if (Object.values(this.apiService.listType).includes(this.state as any)){ 
      this.getRecipesFromCategory()
    }
    else if (this.state === 'fridge'){ 
      this.getRecipesFromFridge()
    }
  }

  getRecipesFromSearch() {
    
    this.apiService.search(this.dataService.searchFilters.text, this.dataService.searchFilters.filters,this.dataService.resultsPageIndex)
    .subscribe({
    next: (response: any) => this.results = this.results.concat(this.dataService.createRecipes(response.items))
  })
  }
  getRecipesFromCategory() {

    this.apiService.list(this.state as any, this.dataService.resultsPageIndex).subscribe((response: any) => {
    this.results = this.results.concat(this.dataService.createRecipes(response.items))
    })
  }
  getRecipesFromFridge() {
    this.apiService.fridge(this.dataService.fridgeIngredients, this.dataService.resultsPageIndex)
      .subscribe((response: any) =>
      this.results = this.results.concat(this.dataService.createRecipes(response.items))
      )
  }
}
