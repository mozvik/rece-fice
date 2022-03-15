import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from '../../service/data.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { chevronRotate } from '../../animations';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
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

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
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
}
