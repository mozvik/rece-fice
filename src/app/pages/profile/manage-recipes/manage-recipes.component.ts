import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrls: ['./manage-recipes.component.scss']
})
export class ManageRecipesComponent implements OnInit {
  @Input() userList: any[] = []
  userRecipes: Recipe[] = [];
  displayedColumns: string[] = ['recipe', 'ingredients', 'directions', 'created', 'moderated'];

  dataSource: MatTableDataSource<any> | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | null | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  isLoading: boolean = false;
  
  public filterGroup = this.fb.group({
    user: ['']
  })

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    let target: any[] = [{ recipeName: 'Válassz egy felhasználót a fenti legördülő listából', ingredients: '', directions: '', moderated: '', created: '' }];
    this.dataSource = new MatTableDataSource(target);

    this.filterGroup.controls['user'].valueChanges.subscribe((value) => this.selectedUserChanged(value))
  }

  selectedUserChanged(value: any) {
    this.isLoading = true
    this.apiService.list('userrecipes', 0, 100000, value.id)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: any) => this.mapRecipes(response.items),
        error: (error: any) => this.messageService.showSnackBar(error.message, 'error')
      })
  }

  mapRecipes(response: any[]) {
    let target: any[] = [];
    response.map(({ recipeId, recipeName, ingredients, directions, created, moderated }) => {
        target.push({ id: recipeId, recipeName: recipeName, ingredients: ingredients, directions: directions, created: created, moderated: moderated  });
    })
    this.dataSource = new MatTableDataSource(target);
  }

  moderateRecipe(recipe: any) {
    this.isLoading = true
    if (recipe.moderated == '0') { 
      this.apiService.moderateRecipe(recipe.id)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (response: any) => {
            if (response === null) {
              this.messageService.showSnackBar('Sikertelen módosítás', 'error');
            }
            else {
              recipe.moderated = '1';
              this.messageService.showSnackBar('Sikeres moderáció', 'success');
              }
          },
          error: (error: any) => this.messageService.showSnackBar('Hiba történt: ' + error, 'error')
        })
    } else {
      this.apiService.activateRecipe(recipe.id)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: any) => {
          if (response === null) {
            this.messageService.showSnackBar('Sikertelen módosítás', 'error');
          }
          else {
            recipe.moderated = '0';
            this.messageService.showSnackBar('Recept sikeresen visszaállítva', 'success');
            }
        },
        error: (error: any) => this.messageService.showSnackBar('Hiba történt: ' + error, 'error')
      })
    }
  }
}
