import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
        getBackgroundImage()
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
  private destroyRef = inject(DestroyRef);
  private blurAnimationState = signal<string>('');
  protected getBackgroundImage = toSignal(this.ts.isDarkMode$);

  constructor() {
    afterNextRender(() => {
      this.ts.isDarkMode$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.triggerAnimation();
        });
    });
  }

  triggerAnimation(): void {
    this.blurAnimationState.update(() => 'animated');
    setTimeout(() => {
      this.blurAnimationState.update(() => '');
    }, 700);
  }
}
