import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-education-tab',
  standalone: true,
  template: `
    <ul>
      <li><span class="text-main-color">2019 - 2023</span></li>
      <li>
        <span>
          Bachelor of Science in Computer Science at Holy Angel University
        </span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationTabComponent {}
