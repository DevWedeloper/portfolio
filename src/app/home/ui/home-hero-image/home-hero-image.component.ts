import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-hero-image',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './home-hero-image.component.html',
  styleUrls: ['./home-hero-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.home-img]': 'true',
    '[class.hiddenAnimate]': 'true',
    '[class.from-right]': 'true',
  },
})
export class HomeHeroImageComponent {}
