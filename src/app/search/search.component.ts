import { animate, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { APIService } from '../service/api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SelectItem, PrimeNGConfig } from "primeng/api";

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
        // animate("0.3s cubic-bezier(0.55, 0.31, 0.15, 0.93)"),
      ]),
    ]),
   
  ]
})
export class SearchComponent implements OnInit {
  @Input() isSearchOpen = false;
  @Input() displaySize = 0;
  @Output() subject = new Subject();
  @Output() closed = new EventEmitter<boolean>();

  modal: any
  inputText: any = ''
  recipesFound: number = 0;
  selectedItems: any = {
    category: undefined,
    difficulity: undefined,
    cost: undefined,
    nationality: undefined,
    label: undefined,
  }
  searchResults: any[] = [];
  
  constructor(
    private primengConfig: PrimeNGConfig,
    public dataService: UserDataService,
    private apiService: APIService,
  ) {}

  ngOnInit(): void {
  
    this.primengConfig.ripple = true;
    this.apiService.filterArray.next(this.selectedItems)
    this.apiService.serviceRecipeSearch(this.inputText, this.selectedItems).subscribe(
      (result) => {
        console.log(result),
        this.searchResults = result.items,
        result.itemCount ? this.recipesFound = result.itemCount : this.recipesFound = 0
      })
    this.modal = document.getElementById('s-modal')
  }
  onSelect(e: any) {
    console.log('választott: :>> ',e);
  }
  onKeyup(e: any) {
    if (e.key === "Enter") {
      console.log('ENTER go search: :>> ',this.inputText);
    }
    
  }
  inputChange(e: any) {
    // if(e) this.apiService.filterArray.next(this.selectedItems)
    let filtered: any[] = [];
    let query = e.query;
    console.log('this.selectedItems :>> ' , e.query);
    this.apiService.serviceRecipeSearch(this.inputText, this.selectedItems).subscribe(
      (result) => {
        console.log(result),
        this.searchResults = result.items,
        result.itemCount ? this.recipesFound = result.itemCount: this.recipesFound = 0
      }
    )
  }
}
