import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { CardComponent } from './ui/card/card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  ss = inject(SectionService);
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.ss.registerSection(this.section);
  }
}
