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
        <p class="exclude" *appSlide>
          A game statistic simulator with dashboard and complex CRUD, also comes
          with Authentication/Authorization.
        </p>
        <ng-container *appSlide>
          <strong><p class="exclude">Front-End</p></strong>
          <ul>
            <li>
              <p class="exclude">Wrote the code in a reactive manner</p>
            </li>
            <li>
              <p class="exclude">
                Use state management for scalability and maintainability
              </p>
            </li>
            <li>
              <p class="exclude">Adopted smart/dumb components architecture</p>
            </li>
            <li>
              <p class="exclude">
                Designed dynamic, responsive interfaces supporting all devices
              </p>
            </li>
          </ul>
        </ng-container>
        <ng-container *appSlide>
          <strong><p class="exclude">Back-End</p></strong>
          <ul>
            <li>
              <p class="exclude">
                Applied clean architecture for clear separation of concerns
              </p>
            </li>
            <li>
              <p class="exclude">
                Utilized dependency injection for testability
              </p>
            </li>
            <li>
              <p class="exclude">
                Implemented caching for optimized compute time
              </p>
            </li>
          </ul>
        </ng-container>
        <ng-container *appSlide>
          <strong><p class="exclude">Auth</p></strong>
          <ul>
            <li><p class="exclude">Refresh token rotation</p></li>
            <li>
              <p class="exclude">
                Implement breach detection/refresh token reuse
              </p>
            </li>
            <li>
              <p class="exclude">Configure tokens to be sent as cookies</p>
            </li>
            <li>
              <p class="exclude">
                Integrate email verification to ensure user actions are
                authenticated
              </p>
            </li>
            <li><p class="exclude">Login with a google account</p></li>
          </ul>
        </ng-container>
        <ng-container *appSlide>
          <p class="exclude">
            There are two roles, standard and admin. Standard users can only do
            GET actions, while admin users can do CREATE, UPDATE, DELETE
            actions.
          </p>
        </ng-container>
        <ng-container *appSlide>
          <p class="exclude">To get started, use either of these accounts:</p>
          <div class="text-center">
            <p class="exclude">username & password: admin</p>
            <p class="exclude">username & password: standard</p>
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
