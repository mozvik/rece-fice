import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { listAnimation } from 'src/app/animations';
import { Recipe } from 'src/app/classes/recipe';
import { OptionsData } from 'src/app/interface/options-data';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
  animations: [
      listAnimation 
  ],
})
export class UserFavoritesComponent implements OnInit {

  @Input() user: string | undefined
  @Input() userFavorites: Recipe[] | undefined
  @Input() userPageIndex: number = 0
  @Output() userPageIndexChange: EventEmitter<number> = new EventEmitter();

  results: Recipe[] = [];
  categories: OptionsData[] = [];

  constructor(
    private dataService: DataService,
    private apiService: APIService,
    private authService: AuthService,
    private messageService: MessageService,
    public dialogDelete: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.apiService.categories.subscribe((categories) => this.categories = categories);   
  }
  navigateToDetails(id: string) { 
    this.router.navigateByUrl(`/details/${id}`)
  }

  navigateToUserProfile(id: string) { 

  }

  navigateToCategory(id: string) {
    let cat = ''
    switch (id) {
      case '1':
        cat = 'appetiser'
        break;
      case '2':
          cat = 'soup'
        break;
      case '3':
          cat = 'maincourse'
        break;
       case '4':
          cat = 'sidedish'
        break;
      case '5':
          cat = 'dessert'
        break;
      case '6':
          cat = 'drink'
        break;
      default:
        cat = ''
        break;
    }
    this.router.navigate(['/results', cat]);
  }

  incrementIndex(): void {
    this.dataService.userRecipePageIndex++
    this.userPageIndexChange.emit(this.dataService.userRecipePageIndex)
    this.moreRecipes()
  }

  moreRecipes() {
    this.apiService.list('userrecipes', this.dataService.userRecipePageIndex, 4, this.authService.user?.userId).subscribe({
      next: (response: any) => {
        this.userFavorites = this.userFavorites!.concat(this.dataService.createRecipes(response.items))
        console.log('userfavs :>> ', response);
      }
    })
   
  }
}
