import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../../../shared/ui/components/modal/modal.service';
import { CloudstaffInternshipComponent } from '../../cloudstaff-internship/cloudstaff-internship.component';

@Component({
  selector: 'app-experience-tab',
  standalone: true,
  imports: [CloudstaffInternshipComponent],
  template: `
    <ul>
      <li>
        <span class="text-main-color">2023 Feb - 2023 May</span>
      </li>
      <li>
        <span>Internship at Cloudstaff</span>
        <span
          class="relative -top-2 inline-block"
          (click)="ms.open(cloudstaffInternship)"
          (keydown.Enter)="ms.open(cloudstaffInternship)"
          tabindex="0"
        >
          <img
            class="w-icon-adjust cursor-pointer select-none black-and-white"
            src="assets/images/icons/open-in-new.svg"
            alt="Open In New Icon"
            loading="lazy"
          />
        </span>
      </li>
    </ul>

    <ng-template #cloudstaffInternship>
      <app-cloudstaff-internship />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTabComponent {
  protected ms = inject(ModalService);
}
