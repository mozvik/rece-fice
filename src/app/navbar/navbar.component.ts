import { Component, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        position: 'absolute',
        top: '530px',
        left: '50%',
        transform: 'translate(-50%,100%)'
      })),
      state('closed', style({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,50%)'
      })),
      transition('open => closed', [
        animate(".35s", keyframes([
          style({ top: "530px", offset: 0 }),
          style({ top: "-25px", offset: 0.49 }),
          style({ top: "-25px", transform: "scale(1.1,.9)", offset: 0.50 }),
          style({ top: "50%", offset: 1 })
        ]))  
      ]),
      transition('closed => open', [
        animate(".5s", keyframes([
          style({ top: "50%", offset: 0 }),
          style({ top: "540px", offset: 0.85 }),
          style({ top: "540px", transform: "scale(1.1,.9)", offset: 0.86 }),
          style({ top: "530px", offset: 1 })
        ]))  
      ]),
    ])
  ]})
export class NavbarComponent implements OnInit {
  dropdownShow: boolean = false;
  advancedSearchIsOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
