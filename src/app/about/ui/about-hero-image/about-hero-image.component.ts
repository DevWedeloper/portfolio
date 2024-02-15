import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../../shared/data-access/theme.service';

@Component({
  selector: 'app-about-hero-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-hero-image.component.html',
  styleUrls: ['./about-hero-image.component.scss'],
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
  host: {
    '[class.about-img]': 'true',
    '[class.hidden]': 'true',
    '[class.from-left]': 'true',
    '[style.background-image]':
      'getBackgroundImage() ? \'url(assets/images/backgrounds/about-night.webp)\' :  \'url(assets/images/backgrounds/about-day.webp)\'',
    '[@blurAnimation]': 'blurAnimationState()',
  },
})
export class AboutHeroImageComponent {
  private ts = inject(ThemeService);
  private blurAnimationState = signal<string>('');
  protected getBackgroundImage = toSignal(this.ts.isDarkMode$);

  constructor() {
    this.ts.isDarkMode$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.triggerAnimation();
    });
  }

  triggerAnimation(): void {
    this.blurAnimationState.update(() => 'animated');
    setTimeout(() => {
      this.blurAnimationState.update(() => '');
    }, 700);
  }
}
