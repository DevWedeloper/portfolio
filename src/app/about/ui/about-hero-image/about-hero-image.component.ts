import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
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
})
export class AboutHeroImageComponent {
  protected ts = inject(ThemeService);
  protected blurAnimationState = new BehaviorSubject<string>('');

  constructor() {
    this.ts.isDarkMode$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.triggerAnimation();
    });
  }

  triggerAnimation(): void {
    this.blurAnimationState.next('animated');
    setTimeout(() => {
      this.blurAnimationState.next('');
    }, 700);
  }
}
