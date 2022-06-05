import { animation, style, animate, trigger, transition, useAnimation, state, keyframes, AnimationMetadata, query, stagger, sequence } from '@angular/animations';

export const chevronRotate = trigger('chevronRotate' ,[
  state(
    'true', style({ transform: "rotate(-180deg)" })
  ),
  state(
    'false', style({ transform: "rotate(0deg)" })
  ),
  transition('false <=> true', [
    animate('400ms cubic-bezier(0.35, 0, 0.25, 1)')
  ])
]);

export const scaleEnterAnimation: AnimationMetadata[] = [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0)' }),
    animate('500ms ease', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
];

export const hoverImageAnimation: AnimationMetadata[] = [
  transition(':enter', [
    style({ opacity: 0}),
    animate('500ms ease', style({ opacity: 1}))
  ]),
  transition(':leave', [
    style({ opacity: 1}),
    animate('500ms ease', style({ opacity: 0}))
  ])
]

export const listAnimation =  trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({opacity: 0, transform: 'scale(0)'}),
      stagger(50, [
        animate('300ms ease',
        style({ opacity: 1, transform: 'none' }))
      ])
    ],
    {optional: true})
  ])
])

export const openClose = trigger('openClose', [
  state(
    'open',
    style({
      transform: 'scaleY(1) translateX(0)',
      opacity: '1',
    })
  ),
  state(
    'closed',
    style({
      left: '-100%',
      transform: 'scaleY(1) translateX(-300px)',
      opacity: '0',
    })
  ),
  transition('closed <=> open', [
    animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)'),
  ]),
]);

export const collapseSubMenu =  trigger("collapseSubMenu", [
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
])
