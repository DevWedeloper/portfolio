import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconWrapperComponent } from '../../../shared/ui/components/icon-wrapper/icon-wrapper.component';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';

@Component({
  selector: 'app-cloudstaff-internship',
  standalone: true,
  imports: [IconWrapperComponent],
  host: {
    class: 'scrollbar-hide inline-block h-[80vh] w-[80vw] overflow-auto p-8',
  },
  template: `
    <div
      class="mb-8 flex justify-between border-b-2 border-b-secondary-color [border-bottom-style:solid]"
    >
      <h3>Project Name: SuiteView</h3>
      <span>
        <img
          class="w-icon-adjust cursor-pointer select-none black-and-white"
          style="-webkit-tap-highlight-color: transparent"
          src="assets/images/icons/close.svg"
          alt="Close Logo"
          (click)="ms.close()"
          (keydown.Enter)="ms.close()"
          tabindex="0"
        />
      </span>
    </div>
    <ul
      class="body mt-8 grid list-none grid-cols-[min-content_1fr] gap-4 text-regular max-md:grid-cols-[1fr] max-md:text-center"
    >
      <li>Tech-Stack:</li>
      <li class="flex">
        <app-icon-wrapper
          class="mr-4"
          src="assets/images/icons/angular.svg"
          alt="Angular Logo"
          tooltipText="Angular"
        />
        <app-icon-wrapper
          class="mr-4"
          src="assets/images/icons/laravel.svg"
          alt="Laravel Logo"
          tooltipText="Laravel"
        />
        <app-icon-wrapper
          class="mr-4"
          src="assets/images/icons/lumen.svg"
          alt="Lumen Logo"
          tooltipText="Lumen"
        />
        <app-icon-wrapper
          class="mr-4"
          src="assets/images/icons/aws-s3-bucket.svg"
          alt="AWS S3 Bucket Logo"
          tooltipText="AWS S3 Bucket"
        />
      </li>
      <li>Description:</li>
      <li>
        This project involved integrating a CCTV system, that takes a photo
        every minute and uploads it to an AWS S3 Bucket. The back-end, written
        in Laravel Lumen, fetches the data from the S3 Bucket. The front-end,
        written in Angular, gets the data from the back-end via API pull. This
        project was presented to the CEO and became an actual product.
      </li>
      <li>Role/s:</li>
      <ul class="list-disc">
        <li>
          Front-End heavy, designing the web app basing from a mock web UI.
        </li>
        <li>Making the web UI responsive, user friendly.</li>
        <li>Connecting the FE to BE via API pull.</li>
      </ul>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudstaffInternshipComponent {
  protected ms = inject(ModalService);
}
