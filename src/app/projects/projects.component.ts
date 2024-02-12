import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  inject,
} from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { ProjectOneComponent } from './features/project-one/project-one.component';
import { ProjectTwoComponent } from './features/project-two/project-two.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectOneComponent, ProjectTwoComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private ss = inject(SectionService);
  private elementRef = inject(ElementRef);
  @HostBinding('attr.id') protected id = 'projects';
  @HostBinding('class.section') protected wrapperClass = true;

  ngOnInit(): void {
    this.ss.registerSection(this.elementRef);
  }
}
