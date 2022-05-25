import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/classes/recipe';
import { OptionsData } from 'src/app/interface/options-data';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  urlClicked: string | undefined;
  categoryClicked: string | undefined;
  recipesLatest: Recipe[] = [];
  recipesFree: Recipe[] = [];
  recipesDaily: Recipe[] = [];
  recipesPopular: Recipe[] = [];

  categories: OptionsData[] = []

  constructor(
    private router: Router,
    private dataService: DataService,
    private apiService: APIService
  ) { }
  
  

  ngOnInit(): void {
    this.apiService.categories.subscribe(categories => this.categories = categories)
    this.getLatest()
    this.getFree()
    this.getDaily()
    this.getPopular()
  }

  getLatest() {
    this.apiService.list('latest', 0, 4)
      .subscribe({
        next: (response: any) => {
          this.recipesLatest = this.dataService.createRecipes(response.items)
            
        }
    })
  }
  getFree() {
    this.apiService.list('free', 0, 4)
      .subscribe({
        next: (response: any) => {

          this.recipesFree = this.dataService.createRecipes(response.items)
        
        }
    })
  }
  getDaily() {
    this.apiService.list('daily', 0, 4)
      .subscribe({
        next: (response: any) => {
          this.recipesDaily = this.dataService.createRecipes(response.items)
        }
    })
  }
  getPopular() {
    this.apiService.list('popular', 0, 4)
      .subscribe({
        next: (response: any) => {
          this.recipesPopular = this.dataService.createRecipes(response.items)
        }
    })
  }

  navigateToDetails(id: string) { 
    this.router.navigateByUrl(`/details/${id}`)
  }
 
}
