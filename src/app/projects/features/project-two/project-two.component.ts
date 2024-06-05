import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-project-two',
  standalone: true,
  imports: [AsyncPipe, CardComponent, SliderComponent],
  template: `
    <app-card
      [src]="
        (ts.isDarkMode$ | async)
          ? 'assets/images/backgrounds/project-two-dark.webp'
          : 'assets/images/backgrounds/project-two-light.webp'
      "
      [title]="'Project Two'"
      [tags]="['Angular', 'NgRx', 'Pexels API', 'Angular Material', 'Vercel']"
      [githubLink]="'https://github.com/DevWedeloper/projectTwo/'"
      [websiteLink]="'https://project-two-infinite-scroll.vercel.app/'"
    >
      <ng-template #cardBodyTemplate>
        <app-slider>
          <ng-template #sliderTemplate>
            <p>An infinite scroll that uses Pexels API.</p>
          </ng-template>
        </app-slider>
      </ng-template>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTwoComponent {
  protected ts = inject(ThemeService);
}
