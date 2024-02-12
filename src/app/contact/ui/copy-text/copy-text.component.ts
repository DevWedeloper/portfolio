import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';

@Component({
  selector: 'app-copy-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[tabindex]': '0',
    '(click)': 'onEvent()',
    '(keydown.Enter)': 'onEvent()',
  },
})
export class CopyTextComponent {
  protected ts = inject(ThemeService);
  private elementRef = inject(ElementRef);
  private clipboard = inject(Clipboard);
  text = input.required<string>();
  @ViewChild('copyImage') private copyImage!: ElementRef;

  protected onEvent(): void {
    this.clipboard.copy(this.text());
    this.animateButton();
  }

  private animateButton(): void {
    this.copyImage.nativeElement.src = 'assets/images/icons/check.svg';
    this.elementRef.nativeElement.style.backgroundColor = 'var(--main-color)';
    setTimeout(() => {
      this.copyImage.nativeElement.src = 'assets/images/icons/copy.svg';
      this.elementRef.nativeElement.style.backgroundColor = '';
    }, 2000);
  }
}
