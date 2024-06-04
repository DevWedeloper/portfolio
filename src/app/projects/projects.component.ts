import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainSectionDirective } from '../shared/ui/components/main-section.directive';
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
    MainSectionDirective,
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {}
