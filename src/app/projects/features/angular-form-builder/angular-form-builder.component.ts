import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { CardDirective } from '../../ui/card/card.directive';
import { SlideDirective } from '../../ui/slider/slide.directive';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-angular-form-builder',
  standalone: true,
  imports: [CardComponent, CardDirective, SliderComponent, SlideDirective],
  template: `
    <app-card
      [src]="
        isDarkMode()
          ? 'assets/images/backgrounds/angular-form-builder-dark.webp'
          : 'assets/images/backgrounds/angular-form-builder-light.webp'
      "
      title="Angular Form Builder"
      [tags]="['Angular', 'Analog.js', 'Spartan UI', 'Tailwind CSS', 'Vercel']"
      githubLink="https://github.com/DevWedeloper/angular-form-builder"
      websiteLink="https://angular-form-builder.vercel.app/"
    >
      <app-slider *appCard>
        <p *appSlide>Creation and management of dynamic forms in Angular.</p>
        <p *appSlide>
          The Builder page provides a user-friendly interface for creating and
          managing dynamic forms. Users can specify the structure and content of
          their forms by defining the necessary fields and validation rules
          using a JSON configuration.
        </p>
        <p *appSlide>
          The Guide page offers comprehensive instructions and best practices
          for creating a dynamic form. The guide aims to help users understand
          how to leverage the full potential of dynamic forms in Angular,
          ensuring they can create flexible and robust forms tailored to their
          specific needs.
        </p>
        <p *appSlide>
          The Quiz page demonstrates a practical application of dynamic forms in
          the context of a quiz. By utilizing the Angular Form Builder, this
          page can dynamically generate quiz questions based on a JSON
          configuration. This allows for easy updates and customization of
          quizzes, making it a versatile tool for educational purposes,
          assessments, or surveys.
        </p>
      </app-slider>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFormBuilderComponent {
  protected isDarkMode = inject(ThemeService).isDarkMode;
}
