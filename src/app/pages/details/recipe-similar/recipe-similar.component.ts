import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Recipe } from 'src/app/classes/recipe';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-recipe-similar',
  templateUrl: './recipe-similar.component.html',
  styleUrls: ['./recipe-similar.component.scss']
})
export class RecipeSimilarComponent implements OnInit {

  @Input() recipe: Recipe | undefined
  customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    autoHeight: false,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    animateIn: 'animate__zoomIn',
    animateOut: 'animate__flipOutY',
    dots: false,
    navSpeed: 700,
    navText: ["<", '>'],
    items: 2,
    nav: true
  }
  
  constructor(public dataService: DataService,) { }

  ngOnInit(): void {
  }

}
