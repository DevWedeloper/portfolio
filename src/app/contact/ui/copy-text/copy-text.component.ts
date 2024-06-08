import { Clipboard } from '@angular/cdk/clipboard';
import { AsyncPipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';

@Component({
  selector: 'app-copy-text',
  standalone: true,
  imports: [NgStyle, AsyncPipe],
  host: {
    '[tabindex]': '0',
    '(click)': 'onEvent()',
    '(keydown.Enter)': 'onEvent()',
    class: 'cursor-pointer rounded-full p-2',
  },
  template: `
    <img
      #copyImage
      class="w-icon-adjust max-w-none select-none"
      src="assets/images/icons/copy.svg"
      alt="Copy Icon"
      [ngStyle]="{
        filter:
          (ts.isDarkMode$ | async)
            ? 'invert(100%) grayscale(100%)'
            : 'grayscale(100%)',
      }"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyTextComponent {
  protected ts = inject(ThemeService);
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
