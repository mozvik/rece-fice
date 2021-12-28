import { animate, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { APIService } from '../service/api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '600px',
        transform: 'scaleY(1)',
        opacity: '1'
      })),
      state('closed', style({
        height: '0px',
        transform: 'scaleY(0)',
        opacity: '0'
      })),
      transition('closed <=> open', [
        animate("0.3s cubic-bezier(0.35, 0, 0.25, 1)"),
        // animate("0.3s cubic-bezier(0.55, 0.31, 0.15, 0.93)"),
      ]),
    ]),
   
  ]
})
export class AdvancedSearchComponent implements OnInit {
  @Input() isOpen = false;
  @Output() subject = new Subject();

  dropdownList: any = [];
  selectedCategoryItems: any = [];
  selectedDifficulityItems: any = [];
  selectedCostItems: any = [];
  selectedNationalityItems: any = [];
  selectedLabelItems: any = [];
  dropdownSettings: IDropdownSettings = {};

  selectedItems: any = {
    category: undefined,
    difficulity: undefined,
    cost: undefined,
    nationality: undefined,
    label: undefined,
  }
 
  constructor(
    public dataService: UserDataService,
    private apiService: APIService
  ) { }

  ngOnInit(): void {
   
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Összes kiválasztása',
      unSelectAllText: 'Szűrők törlése',
      maxHeight: 200,
      allowSearchFilter: true,
      searchPlaceholderText: 'Keresés...'
    };
    this.apiService.filterArray.next(this.selectedItems)
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  pillChange(e: any) {
    if(e) this.apiService.filterArray.next(this.selectedItems)
  }
}

// Callback Methods
// onSelect - Return the selected item when an item is checked. Example : (onSelect)="onItemSelect($event)"
// onSelectAll - Return the all items. Example : (onSelectAll)="onSelectAll($event)".
// onDeSelect - Return the unselected item when an item is unchecked. Example : (onDeSelect)="onItemDeSelect($event)"
// onFilterChange - Return the key press. Example : (onFilterChange)="onFilterChange($event)"
// onDropDownClose- Example : (onDropDownClose)="onDropDownClose()"