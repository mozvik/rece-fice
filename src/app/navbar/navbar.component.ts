import { Component, OnInit } from '@angular/core';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(-100vw)',
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
  displaySize!: number
  isNavScrollFixed: boolean = false
  navEle: any
  sticky:number=0

  constructor() { }

  ngOnInit(): void {
    this.onResize()
    this.navEle = document.getElementById("navContainer");
    this.sticky = this.navEle.offsetTop;
  }

  toggleLogin() {
    this.login = !this.login
    if (this.login) this.loginIcon = "pi pi-user"
    else this.loginIcon = "pi pi-sign-in"
  }
  toggleBurger() {
    this.isOpen = !this.isOpen
    if(!this.isOpen) this.burgerClass = "fa fa-bars"
    else this.burgerClass = "fa fa-times"
    
    if (this.isOpen && this.advancedSearchIsOpen) {
      this.advancedSearchIsOpen = false
    }
  }


  showAdvancedSearch() {
    this.advancedSearchIsOpen = !this.advancedSearchIsOpen;
  }
  getMenuState():string {

    if (this.displaySize <= 2 && this.isOpen && this.advancedSearchIsOpen) {
      this.advancedSearchIsOpen = false
    }

    if(this.displaySize <= 2 && this.isOpen) return 'in'
    if(this.displaySize <= 2 && !this.isOpen) return 'out'


    if (this.displaySize > 2) {
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

  onResize() {
    const ua = navigator.userAgent;
    if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      this.displaySize = 0; //mobile
      return;
    }
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      this.displaySize = 1; //tablet
      return;
    }

    if (window.innerWidth <= 480) {
      this.displaySize = 0; //mobile
    } else if (window.innerWidth <= 768) {
      this.displaySize = 1; //tablet
    } else if (window.innerWidth < 992) {
      this.displaySize = 2; //small screen/laptop
    } else if (window.innerWidth <= 1200) {
      this.displaySize = 3; //desktop
    } else this.displaySize = 4; //large screens
    return;
  }
}
