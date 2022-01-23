import { animation, style, animate, trigger, transition, useAnimation, state, keyframes } from '@angular/animations';

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