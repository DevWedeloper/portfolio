import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainSectionDirective } from '../shared/ui/components/main-section.directive';
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
    MainSectionDirective,
  ],
  template: `
    <section appMainSection id="projects">
      <h2 class="heading">Projects</h2>
      <div class="projects-container">
        <div class="container-item">
          <app-project-one />
        </div>
        <div class="container-item">
          <app-project-two />
        </div>
        <div class="container-item">
          <app-nextjs-supabase-auth />
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 0.5rem;
      }

      .heading {
        text-align: center;
      }

      .projects-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      @media (max-width: 768px) {
        section {
          grid-template-columns: 1fr;
        }

        .projects-container {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {}
