import { Component, OnInit } from '@angular/core';
import { animate, keyframes, query, sequence, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { chevronRotate } from '../animations';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    chevronRotate,
    trigger("collapseSubmenu", [
      transition(":enter", [
        style({ height: 0, overflow: "hidden" }),
        query(".nav-link", [
          style({ opacity: 0, transform: "translateY(-50px)" })
        ]),
        sequence([
          animate("200ms", style({ height: "*" })),
          query(".nav-link", [
            stagger(-30, [
              animate("150ms ease", style({ opacity: 1, transform: "none" }))
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
          style({ opacity: 0, transform: 'translateX(0)' }),
          stagger(60, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateX(100px)', offset: 1 }))
          ])
        ])
      ])
    ]),
    //  trigger('chevronRotate', [
    //   state(
    //     'true', style({ transform: "rotate(-180deg)" })
    //   ),
    //   state(
    //     'false', style({ transform: "rotate(0deg)" })
    //   ),
    //    transition('false <=> true', [
    //      useAnimation(chevronRotate)
    //    ]),
    //  ]),
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
export class SidebarComponent implements OnInit {
  events: string[] = [];
  
  submenuCollapsed: boolean = true;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
