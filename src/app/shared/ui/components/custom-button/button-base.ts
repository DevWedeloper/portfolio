import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive()
export class CustomButtonBase {
  private elementRef = inject(ElementRef);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
    this.elementRef.nativeElement.classList.add('animate');
    setTimeout(() => {
      this.elementRef.nativeElement.classList.remove('animate');
    }, 600);
  }
}
