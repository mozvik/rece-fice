import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-recipe-ratings',
  templateUrl: './recipe-ratings.component.html',
  styleUrls: ['./recipe-ratings.component.scss']
})
export class RecipeRatingsComponent implements OnInit {

  @Input() recipe: Recipe | undefined
  constructor(private apiService: APIService,
  private messageService: MessageService) { }

  rating: number = 0;
  comment: string = '';
  _reviewed: boolean = true;

  public get reviewed(): boolean {
    return this.recipe?.reviews?.find(rv => rv.userId == 1)
  }
  
    

  ngOnInit(): void { 
  }

  submit() {
    this.apiService.review(Number(this.recipe!.id), 1, this.rating, this.comment).subscribe({
      next: (data) => this.messageService.showSnackBar('Értékelés sikeres', 'error'),
      error: (err) => this.messageService.showSnackBar(err.error, 'error')
    }
      )
  }

}
