import { Directive } from '@angular/core';

@Directive({
  selector: '[appBlinkEffect]',
  standalone: true,
  host: {
    class:
      'animate-blink inline border-r-4 border-r-text-color [border-right-style:solid]',
  },
})
export class BlinkEffectDirective {}
