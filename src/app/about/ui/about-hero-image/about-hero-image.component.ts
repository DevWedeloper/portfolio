import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { concat, delay, of, switchMap } from 'rxjs';
import { ThemeService } from '../../../shared/data-access/theme.service';

@Component({
  selector: 'app-about-hero-image',
  standalone: true,
  imports: [NgOptimizedImage],
  host: {
    '[@blurAnimation]': 'blurAnimationState()',
    class: 'relative h-image-height w-image-width overflow-hidden rounded-2xl',
  },
  template: `
    <img
      [ngSrc]="
        isDarkMode()
          ? 'assets/images/backgrounds/about-night.webp'
          : 'assets/images/backgrounds/about-day.webp'
      "
      fill
      alt="About Image"
      class="object-cover"
    />
  `,
  animations: [
    trigger('blurAnimation', [
      state('animated', style({ filter: 'blur(0)' })),
      transition('* => animated', [
        animate(
          '700ms ease-in-out',
          keyframes([
            style({ filter: 'blur(0)', offset: 0 }),
            style({ filter: 'blur(2px)', offset: 0.5 }),
            style({ filter: 'blur(0)', offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutHeroImageComponent {
  private ts = inject(ThemeService);
  protected isDarkMode = toSignal(this.ts.isDarkMode$);
  protected blurAnimationState = toSignal(
    this.ts.isDarkMode$.pipe(
      switchMap(() => concat(of('animated'), of('').pipe(delay(700)))),
    ),
  );
}
