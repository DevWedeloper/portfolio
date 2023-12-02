import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit, inject } from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';
import { CardComponent } from './ui/card/card.component';
import { SliderComponent } from './ui/slider/slider.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CardComponent, SliderComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  ss = inject(SectionService);
  ts = inject(ThemeService);
  elementRef = inject(ElementRef);
  @HostBinding('attr.id') id = 'projects';
  @HostBinding('class.section') wrapperClass = true;

  ngOnInit(): void {
    this.ss.registerSection(this.elementRef);
  }
}
