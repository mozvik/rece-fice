import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from '../../service/data.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { chevronRotate } from '../../animations';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';


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
  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get user(): User | undefined { 
    return this.authService.user;
  }

  constructor(
    public dataService: DataService,
    private apiService: APIService,
    private authService: AuthService,
    private router: Router) { }

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
  logout() {
    this.authService.logout().subscribe()
    this.authService.user = undefined
    this.router.navigateByUrl('/login')
  }
}
