import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/classes/recipe';
import { OptionsData } from 'src/app/interface/options-data';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  categories: OptionsData[] = [];
  
  selectedId: any
  recipe: Recipe = new Recipe();
  isLoggedIn: boolean = this.authService.isLoggedIn;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    private authService: AuthService,
    private apiService: APIService) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(routeParams => {
      this.selectedId = routeParams['id'];

      this.apiService.getRecipe(this.selectedId)
      .subscribe({
        next: (response: any) => {
          this.recipe = this.dataService.createRecipes(response)[0]

          if (!this.recipe) { 
            this.router.navigateByUrl('/home');
          }
            
          // }
          console.log('rec_subscribe_details :>> ', this.recipe);
        }
      })
    });
    this.apiService.categories.subscribe((categories) => this.categories = categories);
   
  }

}
