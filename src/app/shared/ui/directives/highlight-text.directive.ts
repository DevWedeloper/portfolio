import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[highlightText]',
    standalone: true
})
export class HighlightTextDirective {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.color = 'var(--main-color)';
  }
}
