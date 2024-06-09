import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { CardDirective } from '../../ui/card/card.directive';
import { SlideDirective } from '../../ui/slider/slide.directive';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-project-two',
  standalone: true,
  imports: [CardComponent, CardDirective, SliderComponent, SlideDirective],
  template: `
    <app-card
      [src]="
        isDarkMode()
          ? 'assets/images/backgrounds/project-two-dark.webp'
          : 'assets/images/backgrounds/project-two-light.webp'
      "
      [title]="'Project Two'"
      [tags]="['Angular', 'NgRx', 'Pexels API', 'Angular Material', 'Vercel']"
      [githubLink]="'https://github.com/DevWedeloper/projectTwo/'"
      [websiteLink]="'https://project-two-infinite-scroll.vercel.app/'"
    >
      <app-slider *appCard>
        <p *appSlide>An infinite scroll that uses Pexels API.</p>
      </app-slider>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTwoComponent {
  protected isDarkMode = inject(ThemeService).isDarkMode;
}
