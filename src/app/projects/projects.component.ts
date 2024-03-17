import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { NextjsSupabaseAuthComponent } from './features/nextjs-supabase-auth/nextjs-supabase-auth.component';
import { ProjectOneComponent } from './features/project-one/project-one.component';
import { ProjectTwoComponent } from './features/project-two/project-two.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectOneComponent,
    ProjectTwoComponent,
    NextjsSupabaseAuthComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': '\'projects\'',
    '[class.section]': 'true',
  },
})
export class ProjectsComponent implements OnInit {
  private ss = inject(SectionService);
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.ss.registerSection(this.elementRef);
  }
}
