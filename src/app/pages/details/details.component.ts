import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, concatMap, mergeMap, of, switchMap, tap } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { User } from 'src/app/classes/user';
import { OptionsData } from 'src/app/interface/options-data';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  found: boolean = true;
  favs: string[] = [];
  categories: OptionsData[] = [];
  user: User | undefined;
  creatorInfo: any | undefined;
  selectedId: any
  recipe: Recipe = new Recipe();
  similarRecipes: Recipe[] = []
  isLoggedIn: boolean = this.authService.isLoggedIn;
  url:string | undefined

  get isFav() {
    if (this.recipe.id) {
      return this.favs.includes(this.recipe.id);
    }
    return false;
  }
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private messageService: MessageService,
    private authService: AuthService,
    private apiService: APIService) {
    this.user = this.authService.user;
    this.url = this.router.url;

    this.activatedRoute.data
    .pipe(
      switchMap(data => { 
        if (data['recipe'].length === 0) {
          this.found = false;
        }
        this.recipe = this.dataService.createRecipes(data['recipe'])[0]
        return this.apiService.list('similar', 0, 4, '', this.recipe.id);
      }),
      switchMap((data: any) => { 
        this.similarRecipes = this.dataService.createRecipes(data.items);
        return this.authService.userInfo(this.recipe.userId!.toString());
      })
    ).subscribe(userInfo => { 
      this.creatorInfo = userInfo;
      
    })

    this.apiService.categories.subscribe((categories) => this.categories = categories);
    
    if (this.isLoggedIn && this.user) {
      this.authService.getFavoritesSimple(this.user.userId).subscribe((favorites) => this.favs = favorites);

    }
    }

  ngOnInit(): void {
  }

  setFav() {
    this.authService.setFavorite(this.user!.userId, this.recipe!.id!, true).subscribe((res) => { 
      this.messageService.showSnackBar(res, 'success');
      this.favs.push(this.recipe.id!);
    })
  }

  unsetFav() {
    this.authService.setFavorite(this.user!.userId, this.recipe!.id!, false).subscribe((res) => { 
      this.messageService.showSnackBar(res, 'success');
      this.favs = this.favs.filter(id => id !== this.recipe.id);
    })
  }
  
  shareFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank');
  }
  shareTwitter() {
    window.open('https://twitter.com/intent/tweet?url=' + window.location.href, '_blank');
  }

  shareMail() {
    window.open('mailto:', '_blank');
  }
  print() {
    window.print()
  
  }
}
