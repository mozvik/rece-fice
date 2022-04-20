import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  selectedId: any
  recipe: Recipe = new Recipe();

  constructor(private route: ActivatedRoute,
    public dataService: DataService,
    private apiService: APIService) { }

  ngOnInit(): void {

    this.route.params.subscribe(routeParams => {
      this.selectedId = routeParams['id'];
      this.apiService.getRecipes([this.selectedId], 0)
      .subscribe({
        next: (response: any) => {
          this.recipe = this.dataService.createRecipes(response?.items)[0]
          console.log('rec_subscribe_details :>> ', this.recipe);
        }
      })
    });
    this.dataService.selectedRecipe.subscribe(recipe => {
        
      })
  }

}
