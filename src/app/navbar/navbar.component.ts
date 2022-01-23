import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, query, sequence, stagger, state, style, transition, trigger } from '@angular/animations';
import { DataService } from '../service/data.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger("collapseSubmenu", [
      transition(":enter", [
        style({ height: 0, overflow: "hidden" }),
        query(".nav-link", [
          style({ opacity: 0, transform: "translateY(-50px)" })
        ]),
        sequence([
          animate("200ms", style({ height: "*" })),
          query(".nav-link", [
            stagger(-50, [
              animate("400ms ease", style({ opacity: 1, transform: "none" }))
            ])
          ])
        ])
      ]),
    
      transition(":leave", [
        style({ height: "*", overflow: "hidden" }),
        query(".nav-link", [style({ opacity: 1, transform: "none" })]),
        sequence([
          query(".nav-link", [
            stagger(50, [
              animate(
                "300ms ease",
                style({ opacity: 0, transform: "translateY(-50px)" })
              )
            ])
          ]),
          animate("200ms", style({ height: 0 }))
        ])
      ]),
    ]),
    trigger('inOut', [
      transition('false => true', [
        query('.nav-item', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
          stagger(60, [
            animate('200ms cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ]),
    trigger('chevronRotate', [
      state(
        'true', style({ transform: "rotate(-180deg)" })
      ),
      state(
        'false', style({ transform: "rotate(0deg)" })
      ),
      transition('false <=> true', [
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
    ]),
    trigger('navbarDown', [
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
export class NavbarComponent implements OnInit {

  dropdownShow: boolean = false;
  advancedSearchIsOpen: boolean = false;
  login: boolean = false;
  isOpen: boolean = false;
  isSubmenuCollapsed: boolean = false;
  // burgerClass: string = 'fa fa-bars'
  flyInOut: string = ""
  
  
  isNavScrollFixed: boolean = false
  navEle: any
  sticky: number = 0

  @ViewChild(MatMenuTrigger) recipeDropdown!: MatMenuTrigger;
  

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    
    this.navEle = document.getElementById("navContainer");
    this.sticky = this.navEle.offsetTop;
  }

  toggleLogin() {
    this.login = !this.login
    if (this.login) {
      this.dataService.user.hasUploadAccess = true
    }
    else {
      this.dataService.user.hasUploadAccess = false
    }
  }
  // toggleBurger() {

  //   this.isOpen = !this.isOpen
  //   if (!this.isOpen) {
  //     this.burgerClass = "fa fa-bars"

  //   }
  //   else {
  //     this.burgerClass = "fa fa-times"

  //   }
    
  //   if (this.isOpen && this.dataService.advancedSearchIsOpen) {
  //     this.dataService.advancedSearchIsOpen = false
  //   }
  // }

  showAdvancedSearch() {
    this.dataService.searchIsOpen = !this.dataService.searchIsOpen;
  }

  getMenuState():string {

    if (this.dataService.displaySize <= 2 && this.isOpen && this.dataService.searchIsOpen) {
      this.dataService.searchIsOpen = false
    }

    if (this.dataService.displaySize <= 2 && this.isOpen) {
      console.log('in :>> ');
      return 'in'
    }
    if (this.dataService.displaySize <= 2 && !this.isOpen) {
      console.log('out :>> ');
      return 'out'
    }


    if (this.dataService.displaySize > 2) {
      console.log('idle :>> ');
      return 'idle'
    } 

    return ''
  }
  onScroll(event: any) {
    if (window.pageYOffset >= 135) {
      this.isNavScrollFixed = true
    }
    if (window.pageYOffset == 0){
      this.isNavScrollFixed = false
    }
    this.recipeDropdown.closeMenu()
  }

 
}
