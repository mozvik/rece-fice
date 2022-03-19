import { animation, style, animate, trigger, transition, useAnimation, state, keyframes, AnimationMetadata } from '@angular/animations';

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