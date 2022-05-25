import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Recipe } from 'src/app/classes/recipe';
import { DataService } from 'src/app/service/data.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { OptionsData } from 'src/app/interface/options-data';
import { APIService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-header',
  templateUrl: './recipe-header.component.html',
  styleUrls: ['./recipe-header.component.scss']
})
export class RecipeHeaderComponent implements OnInit {

  //https://animate.style/
  //animate.css osztályai a fenti linken megtalálhatóak

  @Input() recipe: Recipe | undefined
  
  customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    animateIn: 'animate__zoomIn',
    animateOut: 'animate__flipOutY',
    dots: true,
    navSpeed: 700,
    navText: ["Előző", 'Következő'],
    items: 1,
    nav: true
  }
  nationalities: OptionsData[] = [];
  difficulties: OptionsData[] = [];
  costs: OptionsData[] = [];
  labels: OptionsData[] = [];

  constructor(
    private router: Router,
    private dataService: DataService,
    private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.costs.subscribe((costs) => (this.costs = costs));
    this.apiService.difficulties.subscribe(
      (difficulties) => (this.difficulties = difficulties)
    );
    this.apiService.nationalities.subscribe(
      (nationalities) => (this.nationalities = nationalities)
    );
    this.apiService.labels.subscribe((labels) => (this.labels = labels));
  }
  
  clickOnLabel(id: number) {
    this.dataService.searchFilters = {advanced: true, text: '', filters: { label: [id]}};
    this.dataService.resultsPageIndex = 0;
    this.router.navigate(['/results', 'search']);
    
  }
}
