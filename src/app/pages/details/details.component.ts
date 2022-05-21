import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, concatMap, mergeMap, of, switchMap, tap } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { User } from 'src/app/classes/user';
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
  found: boolean = true;
  categories: OptionsData[] = [];
  user: User | undefined;
  creatorInfo: any;
  selectedId: any
  recipe: Recipe = new Recipe();
  isLoggedIn: boolean = this.authService.isLoggedIn;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    private authService: AuthService,
    private apiService: APIService) {
    this.user = this.authService.user;
    
    this.activatedRoute.data
    .pipe(
      switchMap(data => { 
        if (data['recipe'].length === 0) {
          this.found = false;
        }
        this.recipe = this.dataService.createRecipes(data['recipe'])[0]
        return this.authService.userInfo(this.recipe.userId!.toString());
      })
    ).subscribe(userInfo => { 
      this.creatorInfo = userInfo;
    })

    this.apiService.categories.subscribe((categories) => this.categories = categories);

    }

  ngOnInit(): void {

    // this.activatedRoute.params.subscribe(routeParams => {
    //   this.selectedId = routeParams['id'];

    //   this.apiService.getRecipe(this.selectedId)
    //   .subscribe({
    //     next: (response: any) => {
    //       this.recipe = this.dataService.createRecipes(response)[0]

    //       if (!this.recipe) { 
    //         this.router.navigateByUrl('/home');
    //       }

    //       console.log('rec_subscribe_details :>> ', this.recipe);
    //     }
    //   })
    // });
    
  }

}
