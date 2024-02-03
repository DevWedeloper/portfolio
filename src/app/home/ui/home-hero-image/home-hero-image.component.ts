import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-hero-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-hero-image.component.html',
  styleUrls: ['./home-hero-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroImageComponent {}
