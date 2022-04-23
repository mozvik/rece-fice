import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { APIService } from '../../service/api.service';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { trigger } from '@angular/animations';
import { hoverImageAnimation, scaleEnterAnimation } from 'src/app/animations';
import { OptionsData } from 'src/app/interface/options-data';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [
    trigger(
      'enterAnimation', scaleEnterAnimation   
    )
  ]
})
export class ResultsComponent implements OnInit {

  categories: OptionsData[] = [];
  // nationalities: OptionsData[] = [];
  // difficulities: OptionsData[] = [];
  // costs: OptionsData[] = [];
  // labels: OptionsData[] = [];

  showImgOverlay: boolean[] = [];
  
  constructor( public dataService: DataService,
    public apiService: APIService,) { }

  ngOnInit(): void {
    this.apiService.categories.subscribe((categories) => this.categories = categories);
    // this.apiService.costs.subscribe((costs) => (this.costs = costs));
    // this.apiService.difficulities.subscribe(
    //   (difficulities) => (this.difficulities = difficulities)
    // );
    // this.apiService.nationalities.subscribe(
    //   (nationalities) => (this.nationalities = nationalities)
    // );
    // this.apiService.labels.subscribe((labels) => (this.labels = labels));

  }

  showImgText(index: number): void {
    this.showImgOverlay[index] = true;
  }
  hideImgText(index: number): void {
    this.showImgOverlay[index] = false;
  }

  incrementIndex(): void {
    this.dataService.searchResultsPageIndex++
    if (this.dataService.searchResultsShowState.state === '') {
      this.getRecipesFromSearch()
    }
    else if (this.dataService.searchResultsShowState.state === 'category'){ 
      this.getRecipesFromCategory()
    }
    else if (this.dataService.searchResultsShowState.state === 'fridge'){ 
      this.getRecipesFromFridge()
    }
  }

  getRecipesFromSearch() {
    this.apiService.getRecipes(this.dataService.searchResults.map((item: { recipeId: any; }) => item.recipeId), this.dataService.searchResultsPageIndex)
      .subscribe({
      next: (response: any) => this.dataService.searchResultsFull = this.dataService.searchResultsFull.concat(this.dataService.createRecipes(response?.items))
    })
  }
  getRecipesFromCategory() {
    this.apiService.getRecipesByCategory(this.dataService.searchResultsShowState.value, this.dataService.searchResultsPageIndex).subscribe((response: any) => {
    this.dataService.searchResultsFull = this.dataService.searchResultsFull.concat(this.dataService.createRecipes(response?.items))
    })
  }
  getRecipesFromFridge() {
    this.apiService.getRecipesFridge(this.dataService.fridgeIngredients, this.dataService.searchResultsPageIndex)
      .subscribe((response: any) =>
      this.dataService.searchResultsFull = this.dataService.searchResultsFull.concat(this.dataService.createRecipes(response?.items))
      )
  }
}
