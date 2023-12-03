import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from 'src/app/shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-project-one',
  standalone: true,
  imports: [CommonModule, CardComponent, SliderComponent],
  templateUrl: './project-one.component.html',
  styleUrls: ['./project-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectOneComponent {
  ts = inject(ThemeService);
}
