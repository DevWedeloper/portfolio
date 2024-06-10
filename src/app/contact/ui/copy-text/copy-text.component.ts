import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-copy-text',
  standalone: true,
  host: {
    '[tabindex]': '0',
    '(click)': 'onEvent()',
    '(keydown.Enter)': 'onEvent()',
    class: 'cursor-pointer rounded-full p-2',
  },
  template: `
    <img
      #copyImage
      class="black-and-white w-icon-adjust max-w-none select-none"
      src="assets/images/icons/copy.svg"
      alt="Copy Icon"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyTextComponent {
  private elementRef = inject(ElementRef);
  private clipboard = inject(Clipboard);
  text = input.required<string>();
  private copyImage = viewChild.required<ElementRef>('copyImage');

  protected onEvent(): void {
    this.clipboard.copy(this.text());
    this.animateButton();
  }

  private animateButton(): void {
    this.copyImage().nativeElement.src = 'assets/images/icons/check.svg';
    this.elementRef.nativeElement.style.backgroundColor = 'var(--main-color)';
    setTimeout(() => {
      this.copyImage().nativeElement.src = 'assets/images/icons/copy.svg';
      this.elementRef.nativeElement.style.backgroundColor = '';
    }, 2000);
  }
}
