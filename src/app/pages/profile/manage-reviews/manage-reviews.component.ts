import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.scss']
})
export class ManageReviewsComponent implements OnInit {
  @Input() userList: any[] = []
  userRecipes: Recipe[] = [];
  displayedColumns: string[] = ['recipe', 'rating', 'review', 'created', 'moderated'];
  dataSource: MatTableDataSource<any> | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | null | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  isLoading: boolean = false;

  public filterGroup = this.fb.group({
    user: ['']
  })
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private apiService: APIService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    let target: any[] = [{recipeName: 'Válassz egy felhasználót a fenti legördülő listából', rating: '', review: '', moderated: '', created: ''}];
    // this.userList.map(({ id, name, email, loginAttempts, lockoutTime, active, ban }) => {
    //   target.push({ id: id, name: name, email: email, loginAttempts: loginAttempts, lockoutTime: lockoutTime, active: active, ban: ban });
    // })
    
    this.dataSource = new MatTableDataSource(target);

    this.filterGroup.controls['user'].valueChanges.subscribe((value) => this.selectedUserChanged(value))
  }

  selectedUserChanged(value: any) {
    this.isLoading = true
    this.apiService.reviews(value.id)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: any[]) => this.mapRecipes(response),
        error: (error: any) => this.messageService.showSnackBar(error.message, 'error')
      })
    }
      
  mapRecipes(response: any[]) {
    let target: any[] = [];
    response.map(({ id, recipeName, created, review, rating, moderated }) => {
        target.push({ id: id, recipeName: recipeName, created: created, review: review, rating: rating, moderated: moderated });
    })
    this.dataSource = new MatTableDataSource(target);
  }

  moderateReview(review: any) {
    this.isLoading = true
    if (review.moderated == '0') { 
      this.apiService.moderateReview(review.id)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (response: any) => {
            if (response === null) {
              this.messageService.showSnackBar('Sikertelen módosítás', 'error');
            }
            else {
              review.moderated = '1';
              this.messageService.showSnackBar('Sikeres moderáció', 'success');
              }
          },
          error: (error: any) => this.messageService.showSnackBar('Hiba történt: ' + error, 'error')
        })
    } else {
      this.apiService.activateReview(review.id)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: any) => {
          if (response === null) {
            this.messageService.showSnackBar('Sikertelen módosítás', 'error');
          }
          else {
            review.moderated = '0';
            this.messageService.showSnackBar('Értékelés sikeresen visszaállítva', 'success');
            }
        },
        error: (error: any) => this.messageService.showSnackBar('Hiba történt: ' + error, 'error')
      })
    }
  }
}
