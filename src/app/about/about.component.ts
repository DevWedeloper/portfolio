import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainSectionDirective } from '../shared/ui/components/main-section.directive';
import { AboutHeroImageComponent } from './ui/about-hero-image/about-hero-image.component';
import { AboutTabComponent } from './ui/about-tab/about-tab.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    AboutHeroImageComponent,
    AboutTabComponent,
    MainSectionDirective,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': "'about'",
    '[class.section]': 'true',
    '[attr.appMainSection]': 'true',
  },
})
export class AboutComponent {}
