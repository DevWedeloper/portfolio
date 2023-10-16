import { Component, Renderer2 } from '@angular/core';
import { NgIf, NgClass, NgStyle } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [NgIf, NgClass, NgStyle]
})
export class ModalComponent {
  isVisible:boolean = false;

  isBodyScrollDisabled: boolean = false;

  constructor(
    private renderer: Renderer2
  ){}

  openModal() {
    this.isVisible = true;
    this.isBodyScrollDisabled = true;
    this.toggleBodyScroll();
  }

  closeModal() {
    this.isVisible = false;
    this.isBodyScrollDisabled = false;
    this.toggleBodyScroll();
  }

  private toggleBodyScroll(): void {
    if (this.isBodyScrollDisabled) {
      this.renderer.addClass(document.body, 'no-scroll');
      
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

}
