import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Recipe } from 'src/app/classes/recipe';
import { DataService } from 'src/app/service/data.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { OptionsData } from 'src/app/interface/options-data';
import { APIService } from 'src/app/service/api.service';

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
    autoWidth: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    animateIn: 'animate__zoomIn',
    animateOut: 'animate__flipOutY',
    dots: true,
    navSpeed: 700,
    navText: ["", ''],
    items: 1,
    nav: false
  }
  nationalities: OptionsData[] = [];
  difficulties: OptionsData[] = [];
  costs: OptionsData[] = [];
  labels: OptionsData[] = [];

  constructor(
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
  
}
