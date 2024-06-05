import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-nextjs-supabase-auth',
  standalone: true,
  imports: [AsyncPipe, CardComponent, SliderComponent],
  template: `
    <app-card
      [src]="
        (ts.isDarkMode$ | async)
          ? 'assets/images/backgrounds/nextjs-supabase-auth-dark.webp'
          : 'assets/images/backgrounds/nextjs-supabase-auth-light.webp'
      "
      [title]="'Next.js + Supabase Auth'"
      [tags]="['Next.js', 'Supabase', 'Tailwind CSS', 'Shadcn UI', 'Vercel']"
      [githubLink]="'https://github.com/DevWedeloper/nextjs-supabase-auth'"
      [websiteLink]="'https://nextjs-supabase-auth-devwedeloper.vercel.app/'"
    >
      <ng-template #cardBodyTemplate>
        <app-slider>
          <ng-template #sliderTemplate>
            <p>Authentication/Authorization using Supabase with Next.js.</p>
          </ng-template>
        </app-slider>
      </ng-template>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextjsSupabaseAuthComponent {
  protected ts = inject(ThemeService);
}
