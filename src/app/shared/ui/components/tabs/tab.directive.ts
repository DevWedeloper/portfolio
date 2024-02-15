import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appTab]',
  standalone: true,
})
export class TabDirective {
  template = inject(TemplateRef);
  title = input.required<string>({ alias: 'appTab' });
}
