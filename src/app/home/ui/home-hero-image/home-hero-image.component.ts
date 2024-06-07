import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-hero-image',
  standalone: true,
  imports: [NgOptimizedImage],
  host: {
    '[class.home-img]': 'true',
    class:
      'animate-blob relative h-image-height w-image-width overflow-hidden border-8 border-solid border-main-color',
  },
  template: `
    <img
      ngSrc="assets/images/backgrounds/me.webp"
      fill
      priority
      alt="Hero Image"
      class="object-cover"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroImageComponent {}
