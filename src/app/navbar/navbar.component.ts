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
        
        // backgroundPosition: '200vw 0',
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
  constructor() { }

  ngOnInit(): void {
    this.onResize()
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
