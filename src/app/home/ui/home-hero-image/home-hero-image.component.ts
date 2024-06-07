import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-hero-image',
  standalone: true,
  imports: [NgOptimizedImage],
  host: {
    '[class.home-img]': 'true',
  },
  template: `
    <img
      ngSrc="assets/images/backgrounds/me.webp"
      fill
      priority
      alt="Hero Image"
    />
  `,
  styles: [
    `
      :host {
        position: relative;
        width: var(--image-width);
        height: var(--image-height);
        border: 0.5rem solid var(--main-color);
        animation: animate 5s ease-in-out infinite;
        overflow: hidden;
      }

      img {
        object-fit: cover;
      }

      @keyframes animate {
        0% {
          border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
        }
        50% {
          border-radius: 42% 61% 36% 66% / 65% 70% 28% 38%;
        }
        100% {
          border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroImageComponent {}
