import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { APIService } from '../../service/api.service';
import {  map, Observable, ReplaySubject, startWith, Subject, take, takeUntil, } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { OptionsData } from '../../interface/options-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'scaleY(1) translateX(0)',
        opacity: '1'
      })),
      state('closed', style({
        left: '-100%',
        transform: 'scaleY(1) translateX(-300px)',
        opacity: '0'
      })),
      transition('closed <=> open', [
        animate("0.6s cubic-bezier(0.35, 0, 0.25, 1)"),
      ]),
    ]),
  ]
})
export class SearchComponent implements OnInit {
  @Input() isSearchOpen = false;
  @Output() subject = new Subject();
  @Output() closed = new EventEmitter<boolean>();

  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

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

  // searchControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  inputText: any = ''
  recipesFound: string = 'Keresés';
  selectedItems: any = {
    category: undefined,
    difficulity: undefined,
    cost: undefined,
    nationality: undefined,
    label: undefined,
  }

  /** ngx-mat-select-search */
  public filteredCategory: ReplaySubject<OptionsData[]> = new ReplaySubject<OptionsData[]>(1);
  protected filteredCategoryCache: OptionsData[] = [];
  public filteredDifficulity: ReplaySubject<OptionsData[]> = new ReplaySubject<OptionsData[]>(1);
  protected filteredDifficulityCache: OptionsData[] = [];
  public filteredLabel: ReplaySubject<OptionsData[]> = new ReplaySubject<OptionsData[]>(1);
  protected filteredLabelCache: OptionsData[] = [];
  public filteredNationality: ReplaySubject<OptionsData[]> = new ReplaySubject<OptionsData[]>(1);
  protected filteredNationalityCache: OptionsData[] = [];
  public filteredCost: ReplaySubject<OptionsData[]> = new ReplaySubject<OptionsData[]>(1);
  protected filteredCostCache: OptionsData[] = [];
  isIndeterminate = false;
  isChecked = false;
  /** ngx-mat-select-search */
  itemCount: number = 0;

  searchResults: any[] = [];

  constructor(
    public dataService: DataService,
    public apiService: APIService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    // this.apiService.searchResultsSubject.subscribe((results) => {
    //   this.searchResults = results
    //   console.log('this.searchResults search :>> ', this.searchResults);
    // })
    // this.apiService.searchResultsSubject.subscribe((results) => {
      
    //   console.log('this.searchResults search :>> ', results);
    // })
    /** ngx-mat-select-search */
    this.apiService.categories.subscribe(categories => {
      this.filteredCategory.next(categories.items.slice())
      this.ngxSearchListen(
        'categoryFilterCtrl',
        'categoryCtrl',
        this.filteredCategory,
        this.filteredCategoryCache,
        this.dataService.categoryList)
    })
    this.apiService.difficulities.subscribe(categories => {
      this.filteredDifficulity.next(categories.items.slice())
      this.ngxSearchListen(
        'difficulityFilterCtrl',
        'difficulityCtrl',
        this.filteredDifficulity,
        this.filteredDifficulityCache,
        this.dataService.difficulityList)
    })
    this.apiService.labels.subscribe(categories => {
      this.filteredLabel.next(categories.items.slice())
      this.ngxSearchListen(
        'labelFilterCtrl',
        'labelCtrl',
        this.filteredLabel,
        this.filteredLabelCache,
        this.dataService.labelList)
    })
    this.apiService.nationalities.subscribe(categories => {
      this.filteredNationality.next(categories.items.slice())
      this.ngxSearchListen(
        'nationalityFilterCtrl',
        'nationalityCtrl',
        this.filteredNationality,
        this.filteredNationalityCache,
        this.dataService.nationalityList)
    })
    this.apiService.costs.subscribe(categories => {
      this.filteredCost.next(categories.items.slice())
      this.ngxSearchListen(
        'costFilterCtrl',
        'costCtrl',
        this.filteredCost,
        this.filteredCostCache,
        this.dataService.costList
      )
    })
    /** ngx-mat-select-search */

    
    this.filteredOptions = this.searchForm.controls['searchCtrl'].valueChanges.pipe(
      startWith(''),
      map( value => this._filter(value) ),
    );

    this.searchForm.controls['searchCtrl']!.valueChanges
      .subscribe(value => {
        if (this.searchForm.controls['searchCtrl'].dirty) {
          this.inputText = value
        this.inputChange()
      }
    });
    
    this.subsValueChange('categoryCtrl', 'category')
    this.subsValueChange('nationalityCtrl', 'nationality')
    this.subsValueChange('difficulityCtrl', 'difficulity')
    this.subsValueChange('labelCtrl', 'label')
    this.subsValueChange('costCtrl', 'cost')
  }
  private _filter(value: string): string[] {

    return this.apiService.searchResults.items.map((searchResults: { recipeName: any; }) => searchResults.recipeName);
  }

  subsValueChange(control: string, selectedCategory: string) {
    
    this.searchForm.controls[control].valueChanges
    .subscribe(value=> {
      this.selectedItems[selectedCategory] = value.map((val: { id: any; }) => val.id)
      this.inputChange()
    });
  }

  onSelect(e: any) {
    console.log('választott: :>> ', e.option.value);
    this.closed.emit(true)
    //this.apiService.searchResultsSubject.next({ items: [e.option.value] })
    
    // this.apiService.getRecipes([e.option.value.recipeId], 0)
    //   .subscribe({
    //     next: (response: any) => {
    //       this.dataService.searchResultsFull = this.dataService.createRecipes(response?.items)
    //     }
    // })
    this.router.navigate(['/details',e.option.value.recipeId]);
  }
  

  closeModal(event: any) {
    if (event.srcElement.id == 's-modal') {
      this.closed.emit(true)
    }
  }
  getOptionText(option: any) {
    return option ? option.recipeName: null;
  }
  
  inputChange() {
    if(typeof this.inputText != "object"){
      this.apiService.recipeSearch(this.inputText,
      this.selectedItems).subscribe(
        (result) => {
          this.apiService.searchResults = result;
          this.dataService.searchResultsSimple = result.items;

          console.log("inputChange php results",result, this.dataService.searchResultsSimple)
        this.searchResults = result?.items,
        result?.itemCount ? this.recipesFound = result.itemCount + ' találat. Mutasd!' : this.recipesFound = 'Keresés'

        this.filteredOptions =  this.searchForm.controls['searchCtrl'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
       
      }
      )
    }
  }
  submitForm() {
    this.closed.emit(true)
    //this.apiService.searchResultsSubject.next(this.apiService.searchResults)
    this.dataService.searchResultsPageIndex = 0
    this.dataService.searchResultsFull = []
    this.apiService.getRecipes(this.dataService.searchResultsSimple.map((item: { recipeId: any; }) => item.recipeId), 0)
      .subscribe({
        next: (response: any) => this.dataService.searchResultsFull = this.dataService.createRecipes(response?.items)
        
    })
  }



  /** ngx-mat-select-search */


  ngxOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    console.log('destroyed advsrch :>> ');
  }
  

  ngxToggleSelectAll(selectAllValue: boolean, control: string, filteredData: ReplaySubject<OptionsData[]>) {
    filteredData.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        if (selectAllValue) {
          this.searchForm.controls[control].patchValue(val);
        } else {
          this.searchForm.controls[control].patchValue([]);
        }
      });
  }
  
  ngxSearchListen(
    filterControl: string,
    selectControl: string,
    filterData: ReplaySubject<OptionsData[]>,
    filterCache: OptionsData[],
    originalData: OptionsData[]) {
    // listen for search field value changes
    this.searchForm.controls[filterControl].valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.ngxFilterOptionsData(filterControl, filterData, filterCache, originalData);
      this.ngxSetToggleAllCheckboxState(selectControl, filterCache);
    });
 }
  
  protected ngxFilterOptionsData(
    filterControl: string,
    filterData: ReplaySubject<OptionsData[]>,
    filterCache: OptionsData[],
    originalData: OptionsData[]) {
    if (!originalData) {
      return;
    }
    // get the search keyword
    let search = this.searchForm.controls[filterControl].value;
    if (!search) {
      filterCache = originalData.slice();
      filterData.next(filterCache);
      return;
    } else {
      search = search.toLowerCase();
    }

    filterCache = originalData.filter(bank => bank.name.toLowerCase().indexOf(search) > -1);
    filterData.next(filterCache);
  }

  protected ngxSetToggleAllCheckboxState(
    selectControl: string,   
    filterCache: OptionsData[],) {
    let filteredLength = 0;
    if (this.searchForm.controls[selectControl] && this.searchForm.controls[selectControl].value) {
      filterCache.forEach(el => {
        if (this.searchForm.controls[selectControl].value.indexOf(el) > -1) {
          filteredLength++;
        }
      });
      this.isIndeterminate = filteredLength > 0 && filteredLength < filterCache.length;
      this.isChecked = filteredLength > 0 && filteredLength === filterCache.length;
    }
  }
}
