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

  get isSearchOpen(): boolean {
    return !!this.dataService.isSearchOpen
  }
  set isSearchOpen(value: boolean) {
    this.dataService.isSearchOpen = value
  } 

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router) { }

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

  toggleSearch() { 
    this.dataService.toggleSearch()
  }

  toggleSidenav() {
    this.dataService.toggleSidenav()
  }
  
  logout() {
    this.authService.logout().subscribe()
    this.authService.user = undefined
    this.router.navigateByUrl('/login')
  }
}
