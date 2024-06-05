import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[appSlide]',
  standalone: true,
})
export class SlideDirective {
  template = inject(TemplateRef);
}
