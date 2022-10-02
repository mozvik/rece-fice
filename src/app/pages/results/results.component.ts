import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { APIService } from '../../service/api.service';
import { finalize, switchMap } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { listAnimation } from 'src/app/animations';
import { OptionsData } from 'src/app/interface/options-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [listAnimation],
})
export class ResultsComponent implements OnInit {
  categories: OptionsData[] = [];
  results: Recipe[] = [];
  state: string = '';
  title: string = 'A keresés eredménye:';
  isLoading: boolean = false;

  searchFilters: any = {
    text: '',
    filters: [],
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private apiService: APIService
  ) {
    this.apiService.categories.subscribe(
      (categories) => (this.categories = categories)
    );

    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.state = params['id'];

          return this.activatedRoute.data;
        })
      )
      .subscribe({
        next: (data) => {
          this.results = this.dataService.createRecipes(data['recipes'].items);

          if (this.state === 'search' || this.state === 'fridge') {
            this.title = 'A keresés eredménye:';
          } else {
            this.title = this.apiService.listType.filter(
              (d) => d.id === this.state
            )[0]?.name;
          }
        },
        error: (err) => {
          this.router.navigate(['/home']);
        },
      });
  }

  ngOnInit(): void {}

  navigateToDetails(id: string) {
    this.router.navigateByUrl(`/details/${id}`);
  }

  navigateToCategory(id: string) {
    let cat = '';
    switch (id) {
      case '1':
        cat = 'appetiser';
        break;
      case '2':
        cat = 'soup';
        break;
      case '3':
        cat = 'maincourse';
        break;
      case '4':
        cat = 'sidedish';
        break;
      case '5':
        cat = 'dessert';
        break;
      case '6':
        cat = 'drink';
        break;
      default:
        cat = '';
        break;
    }
    this.router.navigate(['/results', cat]);
  }

  incrementIndex(): void {
    this.dataService.resultsPageIndex++;
    if (this.state === 'search') {
      this.getRecipesFromSearch();
    } else if (this.state === 'fridge') {
      this.getRecipesFromFridge();
    } else if (this.apiService.listType.filter((d) => d.id === this.state)) {
      this.getRecipesFromCategory();
    }
  }

  getRecipesFromSearch() {
    this.isLoading = true;
    this.apiService
      .search(
        this.dataService.searchFilters.text,
        this.dataService.searchFilters.filters,
        this.dataService.resultsPageIndex
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response: any) =>
          (this.results = this.results.concat(
            this.dataService.createRecipes(response.items)
          )),
      });
  }
  getRecipesFromCategory() {
    this.isLoading = true;
    this.apiService
      .list(this.state as any, this.dataService.resultsPageIndex)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response: any) => {
        this.results = this.results.concat(
          this.dataService.createRecipes(response.items)
        );
      });
  }
  getRecipesFromFridge() {
    this.isLoading = true;
    this.apiService
      .fridge(
        this.dataService.fridgeIngredients,
        this.dataService.resultsPageIndex,
        8
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (response: any) =>
          (this.results = this.results.concat(
            this.dataService.createRecipes(response.items)
          ))
      );
  }
}
