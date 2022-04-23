import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../service/data.service';
import { APIService } from '../../service/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OptionsData } from '../../interface/options-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          transform: 'scaleY(1) translateX(0)',
          opacity: '1',
        })
      ),
      state(
        'closed',
        style({
          left: '-100%',
          transform: 'scaleY(1) translateX(-300px)',
          opacity: '0',
        })
      ),
      transition('closed <=> open', [
        animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)'),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  @Input() isSearchOpen = false;
  @Output() closed = new EventEmitter<boolean>();

  searchForm = new FormGroup({
    searchCtrl: new FormControl(''),
    categoryCtrl: new FormControl(''),
    categoryFilterCtrl: new FormControl(''),
    difficulityCtrl: new FormControl(''),
    difficulityFilterCtrl: new FormControl(''),
    labelCtrl: new FormControl(''),
    labelFilterCtrl: new FormControl(''),
    nationalityCtrl: new FormControl(''),
    nationalityFilterCtrl: new FormControl(''),
    costCtrl: new FormControl(''),
    costFilterCtrl: new FormControl(''),
  });

  categories: OptionsData[] = [];
  nationalities: OptionsData[] = [];
  difficulities: OptionsData[] = [];
  costs: OptionsData[] = [];
  labels: OptionsData[] = [];

  inputText: any = '';
  recipesFound: string = 'Keresés';
  selectedItems: any = {
    category: undefined,
    difficulity: undefined,
    cost: undefined,
    nationality: undefined,
    label: undefined,
  };

  searchResults: any[] = [];

  constructor(
    private dataService: DataService,
    private apiService: APIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.categories.subscribe((categories) =>       this.categories = categories);
    this.apiService.costs.subscribe((costs) => (this.costs = costs));
    this.apiService.difficulities.subscribe(
      (difficulities) => (this.difficulities = difficulities)
    );
    this.apiService.nationalities.subscribe(
      (nationalities) => (this.nationalities = nationalities)
    );
    this.apiService.labels.subscribe((labels) => (this.labels = labels));

    this.searchForm.controls['searchCtrl']!.valueChanges.subscribe((value) => {
      if (this.searchForm.controls['searchCtrl'].dirty) {
        this.inputText = value;
        this.inputChange();
      }
    });

    this.subsValueChange('categoryCtrl', 'category');
    this.subsValueChange('nationalityCtrl', 'nationality');
    this.subsValueChange('difficulityCtrl', 'difficulity');
    this.subsValueChange('labelCtrl', 'label');
    this.subsValueChange('costCtrl', 'cost');
  }

  subsValueChange(control: string, selectedCategory: string) {
    this.searchForm.controls[control].valueChanges.subscribe((value) => {
      this.selectedItems[selectedCategory] = value.map(
        (val: { id: any }) => val.id
      );
      this.inputChange();
    });
  }

  onSelect(e: any) {
    this.closed.emit(true);
    this.router.navigate(['/details', e.option.value.recipeId]);
  }

  closeModal(event: any) {
    if (event.srcElement.id == 's-modal') {
      this.closed.emit(true);
    }
  }
  getOptionText(option: any) {
    return option ? option.recipeName : null;
  }

  inputChange() {
    if (typeof this.inputText != 'object') {
      this.apiService
        .recipeSearch(this.inputText, this.selectedItems, 0)
        .subscribe((result) => {
          console.log('results :>> ', this.selectedItems, result);
          if (result) {
            // this.searchResults = result.items;

            (this.searchResults = result.items),
              result.itemCount
                ? (this.recipesFound =
                    result.totalResults + ' találat. Mutasd!')
                : (this.recipesFound = '0 találat.');
          } else {
            this.searchResults = [];
          }
        });
    }
  }

  submitForm() {
    this.closed.emit(true);
    this.dataService.searchResultsShowState.state = '';
    this.dataService.searchResultsPageIndex = 1;
    this.dataService.searchResultsFull = this.dataService.createRecipes(
      this.searchResults
    );
  }
}
