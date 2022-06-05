import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { DataService } from '../../../service/data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { listAnimation } from 'src/app/animations';
import { APIService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { OptionsData } from 'src/app/interface/options-data';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss'],
  animations: [
      listAnimation 
  ],
  
})
export class UserRecipesComponent implements OnInit {
  
  @Input() user: string | undefined
  @Input() userRecipes: Recipe[] | undefined
  @Input() userPageIndex: number = 0
  @Output() userPageIndexChange: EventEmitter<number> = new EventEmitter();

  results: Recipe[] = [];


  categories: OptionsData[] = [];

  showImgOverlay: boolean[] = [];
  dialogDeleteRef: any
  xxx: Recipe[] = []

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

  navigateToEditRecipe(id: string) {
    this.router.navigate(['/edit', id])
  }


  incrementIndex(): void {
    this.dataService.userRecipePageIndex++
    this.userPageIndexChange.emit(this.dataService.userRecipePageIndex)
    this.moreRecipes()
  }

  moreRecipes() {
    this.apiService.list('userrecipes', this.dataService.userRecipePageIndex, 4, this.authService.user?.userId).subscribe({
      next: (response: any) => {
        this.userRecipes = this.userRecipes!.concat(this.dataService.createRecipes(response.items))
      }
    })
   
  }

  showImgText(index: number): void {
    this.showImgOverlay[index] = true;
  }
  hideImgText(index: number): void { this.showImgOverlay[index] = false; }

  openDeleteDialog(item: Recipe): void {

    this.dialogDeleteRef = this.dialogDelete.open(DialogDelete, 
      { data: item.recipeName }
    );

    this.dialogDeleteRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.apiService.deleteRecipe(item.id).subscribe({
          next: (response: any) => {
            this.userPageIndexChange.emit(0)
            this.dataService.userRecipePageIndex = 0
            this.dataService.userRecipeList = []
            this.messageService.showSnackBar('A recept sikeresen törlölve lett.', 'success')
            this.router.navigate(['/profile'])
          }
        })
      } 
    });
  }

  
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {
  constructor(@Inject(MAT_DIALOG_DATA) public data:  string) { }
}