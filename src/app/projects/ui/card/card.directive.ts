import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[appCard]',
  standalone: true,
})
export class CardDirective {
  template = inject(TemplateRef);
}
