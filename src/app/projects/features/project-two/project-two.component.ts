import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardComponent } from '../../ui/card/card.component';
import { SliderComponent } from '../../ui/slider/slider.component';

@Component({
  selector: 'app-project-two',
  standalone: true,
  imports: [CommonModule, CardComponent, SliderComponent],
  templateUrl: './project-two.component.html',
  styleUrl: './project-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTwoComponent {
  protected ts = inject(ThemeService);
}
