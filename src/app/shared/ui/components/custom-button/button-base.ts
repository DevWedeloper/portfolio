import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  host: {
    '(click)': 'onClick($event)',
  },
})
export class CustomButtonBase {
  private elementRef = inject(ElementRef);

  protected onClick(event: MouseEvent) {
    event.preventDefault();
    this.elementRef.nativeElement.classList.add('animate');
    setTimeout(() => {
      this.elementRef.nativeElement.classList.remove('animate');
    }, 600);
  }
}
