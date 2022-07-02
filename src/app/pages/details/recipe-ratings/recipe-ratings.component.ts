import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-recipe-ratings',
  templateUrl: './recipe-ratings.component.html',
  styleUrls: ['./recipe-ratings.component.scss']
})
export class RecipeRatingsComponent implements OnInit {

  @Input() recipe: Recipe | undefined
  constructor(
    private apiService: APIService,
    private messageService: MessageService,
    private authService: AuthService) { }

  rated: boolean = false;
  rating: number = 0;
  comment: string = '';
  _reviewed: boolean = true;
  isLoading: boolean = false;

  public get reviewed(): boolean {
    return this.recipe?.reviews?.find(rv => rv.userId == this.authService.user?.userId)
  }

  public get isLoggedIn() {
    return !!this.authService.isLoggedIn
  }
  public get currentUserId() {
    return this.authService.user?.userId
  }

  ngOnInit(): void {
  }

  submit() {
    this.isLoading = true;
    this.apiService.review(Number(this.recipe!.id), this.authService.user!.userId, this.rating, this.comment).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (data) => {
        this.recipe?.reviews?.push({
          created: data.created,
          comment: data.comment,
          rating: data.rating,
          userName: this.authService.user?.name,
          userId: this.authService.user?.userId
        })
        this.rated = true;
        this.messageService.showSnackBar('Értékelés sikeres', 'success')
      },
      error: (err) => this.messageService.showSnackBar(err.error, 'error')
    }
      )
  }

}
