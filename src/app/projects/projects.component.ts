import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  sectionService = inject(SectionService);
  themeService = inject(ThemeService);
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.sectionService.registerSection(this.section);
  }

  isDarkMode(): boolean {
    return this.themeService.getIsDarkMode();
  }
}
