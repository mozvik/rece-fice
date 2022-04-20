import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Recipe } from 'src/app/classes/recipe';
import { DataService } from 'src/app/service/data.service';
// import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';
// import SwiperCore from 'swiper';
// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  constructor(public dataService: DataService,) { }

  ngOnInit(): void {
  
  }
  
}
