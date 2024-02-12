import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ViewChild,
  inject,
  input
} from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';

@Component({
  selector: 'app-copy-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyTextComponent {
  ts = inject(ThemeService);
  elementRef = inject(ElementRef);
  clipboard = inject(Clipboard);
  text = input.required<string>();
  @ViewChild('copyImage') copyImage!: ElementRef;
  @HostBinding('tabindex') tabIndex = 0;
  @HostListener('click')
  @HostListener('keydown.Enter', ['$event'])
  onEvent(): void {
    this.clipboard.copy(this.text());
    this.animateButton();
  }

  animateButton(): void {
    this.copyImage.nativeElement.src = 'assets/images/icons/check.svg';
    this.elementRef.nativeElement.style.backgroundColor = 'var(--main-color)';
    setTimeout(() => {
      this.copyImage.nativeElement.src = 'assets/images/icons/copy.svg';
      this.elementRef.nativeElement.style.backgroundColor = '';
    }, 2000);
  }
}
