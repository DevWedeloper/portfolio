import {
  Directive,
  ElementRef,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

@Directive({
  host: {
    '(click)': 'onClick($event)',
  },
})
export class CustomButtonBase {
  private elementRef = inject(ElementRef);
  disableEffect = input<unknown>({
    transform: booleanAttribute,
  });

  protected onClick(event: MouseEvent) {
    if (this.disableEffect()) {
      event.preventDefault();
      this.elementRef.nativeElement.classList.add('animate');
      setTimeout(() => {
        this.elementRef.nativeElement.classList.remove('animate');
      }, 600);
    }
  }
}
