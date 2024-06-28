import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainSectionDirective } from '../shared/ui/components/main-section.directive';
import { AngularFormBuilderComponent } from './features/angular-form-builder/angular-form-builder.component';
import { NextjsSupabaseAuthComponent } from './features/nextjs-supabase-auth/nextjs-supabase-auth.component';
import { ProjectOneComponent } from './features/project-one/project-one.component';
import { ProjectTwoComponent } from './features/project-two/project-two.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ProjectOneComponent,
    ProjectTwoComponent,
    NextjsSupabaseAuthComponent,
    AngularFormBuilderComponent,
    MainSectionDirective,
  ],
  template: `
    <section appMainSection id="projects" class="flex flex-col gap-2">
      <h2 class="text-center">Projects</h2>
      <div class="grid grid-cols-[1fr,1fr] gap-4 max-md:grid-cols-[1fr]">
        <app-project-one />
        <app-project-two />
        <app-nextjs-supabase-auth />
        <app-angular-form-builder />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {}
