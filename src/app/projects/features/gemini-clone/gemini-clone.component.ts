import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { CardDirective } from '../../ui/card/card.directive';
import { SlideDirective } from '../../ui/slider/slide.directive';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-gemini-clone',
  standalone: true,
  imports: [CardComponent, CardDirective, SliderComponent, SlideDirective],
  template: `
    <app-card
      [src]="
        isDarkMode()
          ? 'assets/images/backgrounds/gemini-clone-dark.webp'
          : 'assets/images/backgrounds/gemini-clone-light.webp'
      "
      title="Gemini Clone"
      [tags]="[
        'Angular',
        'Analog.js',
        'Gemini API',
        'Spartan UI',
        'Tailwind CSS',
        'Vercel',
      ]"
      githubLink="https://github.com/DevWedeloper/gemini-clone"
      websiteLink="https://gemini-clone-devwedeloper.vercel.app/"
    >
      <app-slider *appCard>
        <p class="exclude" *appSlide>
          Access and interact with the Gemini API.
        </p>
        <div *appSlide>
          <p class="exclude">Features:</p>
          <ul>
            <li><p class="exclude">Prompt history is saved in memory.</p></li>
            <li>
              <p class="exclude">
                Ability to make prompts using your microphone.
              </p>
            </li>
            <li>
              <p class="exclude">
                Streaming responses for a more dynamic interaction.
              </p>
            </li>
          </ul>
        </div>
      </app-slider>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeminiCloneComponent {
  protected isDarkMode = inject(ThemeService).isDarkMode;
}
