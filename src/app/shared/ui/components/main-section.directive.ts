import { Directive } from '@angular/core';

@Directive({
  selector: '[appMainSection]',
  standalone: true,
  host: {
    '[class.section]': 'true',
  },
})
export class MainSectionDirective {}
