import { animate, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '600px',
        opacity: '1'
      })),
      state('closed', style({
        height: '0px',
        opacity: '0'
      })),
      transition('closed <=> open', [
        animate("0.3s cubic-bezier(0.35, 0, 0.25, 1)"),

        // animate(".35s ease-out", keyframes([
        //   style({ opacity: "1", offset: 0 }),
        //   style({ opacity: "1", offset: 0.19 }),
        //   style({ opacity: "1", offset: 1 })
        // ])) 
      ]),
    ]),
  ]
})
export class AdvancedSearchComponent implements OnInit {
  @Input() isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}
