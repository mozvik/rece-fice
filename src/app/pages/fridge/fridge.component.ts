import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredients: string[] = [];
  
  constructor(
    private router: Router,
    private dataService: DataService,
    private apiService: APIService) { }

  ngOnInit(): void {
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.ingredients.push(value);
    }
    event.chipInput!.clear();
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  submitForm() {
    // this.dataService.searchResultsShowState.state = 'fridge'
    this.dataService.resultsPageIndex = 0
    // this.dataService.searchResultsFull = []
    this.dataService.fridgeIngredients = this.ingredients
   
    // this.apiService.getRecipesFridge(this.dataService.fridgeIngredients, 0)
    //   .subscribe({
    //     next: (response: any) => this.dataService.searchResultsFull = this.dataService.createRecipes(response?.items)
        
    // })
    this.router.navigate(['/results', 'fridge']);
    // this.apiService.fridge(this.dataService.fridgeIngredients, 0, 4)
    //   .subscribe({
    //     next: (response: any) => this.dataService.searchResultsFull = this.dataService.createRecipes(response?.items)
        
    // })
  }
}
