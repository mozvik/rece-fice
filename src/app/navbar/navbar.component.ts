import { Component, OnInit } from '@angular/core';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateX(100vw)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(0)',
        opacity: 0
      })),
      state('idle', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('out => in', [
        animate('{{duration}} {{delay}}')
      ], {
        params: {
          delay: "0ms",
          duration: '0ms'
        }
      }),
      transition('in => out', [
        animate('.3s')
      ]),
      transition('* => idle', [
        animate(0)
      ])
    ]),
    trigger('navDown', [
      state('down', style({

      })),
      state('up', style({
        top: '0px',

      })),
      transition('down => up', [
        animate('400ms ease')
      ]),
      transition('up => down', [
        animate('400ms ease')
      ]),
    ]),
  ]
})
export class NavbarComponent implements OnInit {
  dropdownShow: boolean = false;
  advancedSearchIsOpen: boolean = false;
  login: boolean = false;
  isOpen: boolean = false;
  loginIcon: string = 'pi pi-sign-in'
  burgerClass: string = 'fa fa-bars'
  flyInOut: string = ""
  myTime: string = "500ms"
  isNavScrollFixed: boolean = false
  navEle: any
  sticky:number=0

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    
    this.navEle = document.getElementById("navContainer");
    this.sticky = this.navEle.offsetTop;
  }

  toggleLogin() {
    this.login = !this.login
    if (this.login) {
      this.loginIcon = "pi pi-user"
      this.dataService.user.hasUploadAccess = true
    }
    else {
      this.loginIcon = "pi pi-sign-in"
      this.dataService.user.hasUploadAccess = false
    }
  }
  toggleBurger() {
    this.isOpen = !this.isOpen
    if(!this.isOpen) this.burgerClass = "fa fa-bars"
    else this.burgerClass = "fa fa-times"
    
    if (this.isOpen && this.dataService.advancedSearchIsOpen) {
      this.dataService.advancedSearchIsOpen = false
    }
  }

  showAdvancedSearch() {
    this.dataService.advancedSearchIsOpen = !this.dataService.advancedSearchIsOpen;
  }

  getMenuState():string {

    if (this.dataService.displaySize <= 2 && this.isOpen && this.dataService.advancedSearchIsOpen) {
      this.dataService.advancedSearchIsOpen = false
    }

    if (this.dataService.displaySize <= 2 && this.isOpen) {
      return 'in'
    }
    if (this.dataService.displaySize <= 2 && !this.isOpen) {
      return 'out'
    }


    if (this.dataService.displaySize > 2) {
      return 'idle'
    } 

    return ''
  }
  onScroll(event: any) {
    if (window.pageYOffset >= 108) {
      this.isNavScrollFixed = true
    }
    if (window.pageYOffset == 0){
      this.isNavScrollFixed = false
    }
  }

 
}
