import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-recipe-similar',
  templateUrl: './recipe-similar.component.html',
  styleUrls: ['./recipe-similar.component.scss'],
})
export class RecipeSimilarComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
  @Input() similarRecipes: Recipe[] | undefined;

  customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    autoHeight: false,
    autoplayTimeout: 7000,
    autoplaySpeed: 1500,
    autoplay: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['Előző', 'Következő'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
    },
    nav: true,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}
  navigateToDetails(id: string) {
    this.router.navigateByUrl(`/details/${id}`);
  }
}
