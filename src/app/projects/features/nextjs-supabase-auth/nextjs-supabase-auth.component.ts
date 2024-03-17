import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-nextjs-supabase-auth',
  standalone: true,
  imports: [CommonModule, CardComponent, SliderComponent],
  templateUrl: './nextjs-supabase-auth.component.html',
  styleUrl: './nextjs-supabase-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextjsSupabaseAuthComponent {
  protected ts = inject(ThemeService);
}
