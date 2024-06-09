import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { CardDirective } from '../../ui/card/card.directive';
import { SlideDirective } from '../../ui/slider/slide.directive';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-project-one',
  standalone: true,
  imports: [CardComponent, CardDirective, SliderComponent, SlideDirective],
  template: `
    <app-card
      [src]="
        isDarkMode()
          ? 'assets/images/backgrounds/project-one-background-dark.png'
          : 'assets/images/backgrounds/project-one-background-light.png'
      "
      [title]="'Project One'"
      [tags]="[
        'MEAN',
        'ChartJS',
        'Cloud Functions',
        'Vercel',
        'MongoDB Atlas',
        'NgRx',
        'OAuth 2.0',
      ]"
      [githubLink]="'https://github.com/DevWedeloper/projectOneFrontEnd/'"
      [websiteLink]="'https://project-one-front-end.vercel.app/'"
    >
      <app-slider *appCard>
        <p *appSlide>
          A game statistic simulator with dashboard and complex CRUD, also comes
          with Authentication/Authorization.
        </p>
        <ng-container *appSlide>
          <strong><p>Front-End</p></strong>
          <ul>
            <li>
              <p>Wrote the code in a reactive manner</p>
            </li>
            <li>
              <p>Use state management for scalability and maintainability</p>
            </li>
            <li>
              <p>Adopted smart/dumb components architecture</p>
            </li>
            <li>
              <p>
                Designed dynamic, responsive interfaces supporting all devices
              </p>
            </li>
          </ul>
        </ng-container>
        <ng-container *appSlide>
          <strong><p>Back-End</p></strong>
          <ul>
            <li>
              <p>Applied clean architecture for clear separation of concerns</p>
            </li>
            <li><p>Utilized dependency injection for testability</p></li>
            <li><p>Implemented caching for optimized compute time</p></li>
          </ul>
        </ng-container>
        <ng-container *appSlide>
          <strong><p>Auth</p></strong>
          <ul>
            <li><p>Refresh token rotation</p></li>
            <li><p>Implement breach detection/refresh token reuse</p></li>
            <li><p>Configure tokens to be sent as cookies</p></li>
            <li>
              <p>
                Integrate email verification to ensure user actions are
                authenticated
              </p>
            </li>
            <li><p>Login with a google account</p></li>
          </ul>
        </ng-container>
        <ng-container *appSlide>
          <p>
            There are two roles, standard and admin. Standard users can only do
            GET actions, while admin users can do CREATE, UPDATE, DELETE
            actions.
          </p>
        </ng-container>
        <ng-container *appSlide>
          <p>To get started, use either of these accounts:</p>
          <div class="text-center">
            <p>username & password: admin</p>
            <p>username & password: standard</p>
          </div>
        </ng-container>
      </app-slider>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectOneComponent {
  protected isDarkMode = inject(ThemeService).isDarkMode;
}
