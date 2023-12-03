import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit, inject } from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { ProjectOneComponent } from './features/project-one/project-one.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectOneComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  ss = inject(SectionService);
  elementRef = inject(ElementRef);
  @HostBinding('attr.id') id = 'projects';
  @HostBinding('class.section') wrapperClass = true;

  ngOnInit(): void {
    this.ss.registerSection(this.elementRef);
  }
}
