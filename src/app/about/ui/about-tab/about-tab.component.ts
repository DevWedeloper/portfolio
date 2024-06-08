import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabDirective } from '../../../shared/ui/components/tabs/tab.directive';
import { TabsComponent } from '../../../shared/ui/components/tabs/tabs.component';
import { EducationTabComponent } from './education-tab/education-tab.component';
import { ExperienceTabComponent } from './experience-tab/experience-tab.component';
import { SkillsTabComponent } from './skills-tab/skills-tab.component';

const tab = 'animate-fadeInLeft block list-none text-regular';

@Component({
  selector: 'app-about-tab',
  standalone: true,
  imports: [
    TabsComponent,
    TabDirective,
    SkillsTabComponent,
    ExperienceTabComponent,
    EducationTabComponent,
  ],
  host: {
    class: 'w-full rounded-2xl',
  },
  template: `
    <app-tabs>
      <app-skills-tab *appTab="'Skills'" class="${tab}" />
      <app-experience-tab *appTab="'Experience'" class="${tab}" />
      <app-education-tab *appTab="'Education'" class="${tab}" />
    </app-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutTabComponent {}
