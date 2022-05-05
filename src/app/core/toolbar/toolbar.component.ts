import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from '../../service/data.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { chevronRotate } from '../../animations';
import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    chevronRotate,
    trigger('toolbarSlideDown', [
      state(
        'true', style({ top: "0px" })
      ),
      state(
        'false', style({ top: '*' })
      ),
      transition('false => true', [
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
    ]),
  
  ]
})
export class ToolbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) recipeDropdown!: MatMenuTrigger;


  dropdownCollapsed: boolean = true;
  toolbarDown: boolean = false;
  //listType: any

  constructor(public dataService: DataService,
  private apiService: APIService) { }

  ngOnInit(): void {
    //this.listType = this.apiService.listType
  }
  

  onScroll(event: any) {
    if (window.pageYOffset >= 128) {
      this.toolbarDown = true
    }
    if (window.pageYOffset == 0){
      this.toolbarDown = false
    }
    this.recipeDropdown.closeMenu()
  }

  showRecipes(categoryId: any) {
    this.dataService.searchResultsPageIndex = 0
    this.dataService.searchResultsFull = []
    this.dataService.searchResultsShowState.state = 'category'
    this.dataService.searchResultsShowState.value = categoryId

    console.log('object :>> ', categoryId);
    this.apiService.list(categoryId, 0, 4).subscribe((response: any) => {
      this.dataService.searchResultsFull = this.dataService.createRecipes(response?.items)
      console.log('this.dataService.searchResultsFull :>> ', this.dataService.searchResultsFull);
    })

  }
}
