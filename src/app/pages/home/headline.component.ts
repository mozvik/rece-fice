import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss'],
})
export class HeadlineComponent implements OnInit {
  recipeCount: string | undefined;

  constructor(private apiService: APIService) {
    this.apiService.recipeCount().subscribe((data: any) => {
      this.recipeCount = data.totalRecipes;
    });
  }

  ngOnInit(): void {}
}
