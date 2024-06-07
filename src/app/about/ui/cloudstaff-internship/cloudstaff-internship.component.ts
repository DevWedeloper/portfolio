import { AsyncPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';
import { TooltipDirective } from '../../../shared/ui/components/tooltip/tooltip.directive';

@Component({
  selector: 'app-cloudstaff-internship',
  standalone: true,
  imports: [NgStyle, AsyncPipe, TooltipDirective],
  template: `
    <div class="header">
      <h3>Project Name: SuiteView</h3>
      <span>
        <img
          class="w-icon-adjust select-none"
          style="-webkit-tap-highlight-color: transparent"
          src="assets/images/icons/close.svg"
          alt="Close Logo"
          (click)="ms.close()"
          (keydown.Enter)="ms.close()"
          tabindex="0"
          [ngStyle]="{
            filter:
              (ts.isDarkMode$ | async)
                ? 'invert(100%) grayscale(100%)'
                : 'grayscale(100%)'
          }"
        />
      </span>
    </div>
    <ul class="body">
      <li class="body-title">Tech-Stack:</li>
      <li class="flex">
        <span appTooltip tooltipText="Angular">
          <img
            class="w-8 select-none"
            src="assets/images/icons/angular.svg"
            alt="Angular Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="Laravel">
          <img
            class="w-8 select-none"
            src="assets/images/icons/laravel.svg"
            alt="Laravel Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="Lumen">
          <img
            class="w-8 select-none"
            src="assets/images/icons/lumen.svg"
            alt="Lumen Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="AWS S3 Bucket">
          <img
            class="w-8 select-none"
            src="assets/images/icons/aws-s3-bucket.svg"
            alt="AWS S3 Bucket Logo"
            loading="lazy"
          />
        </span>
      </li>
      <li class="body-title">Description:</li>
      <li>
        This project involved integrating a CCTV system, that takes a photo
        every minute and uploads it to an AWS S3 Bucket. The back-end, written
        in Laravel Lumen, fetches the data from the S3 Bucket. The front-end,
        written in Angular, gets the data from the back-end via API pull. This
        project was presented to the CEO and became an actual product.
      </li>
      <li class="body-title">Role/s:</li>
      <ul>
        <li>
          Front-End heavy, designing the web app basing from a mock web UI.
        </li>
        <li>Making the web UI responsive, user friendly.</li>
        <li>Connecting the FE to BE via API pull.</li>
      </ul>
    </ul>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        height: 80vh;
        width: 80vw;
        padding: 2rem;
        overflow: auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 2rem;
        border-bottom: 2px solid var(--secondary-color);
      }

      .header span img {
        cursor: pointer;
      }

      .body {
        display: grid;
        grid-template-columns: min-content 1fr;
        padding-top: 2rem;
        gap: 0.5rem;
        font-size: var(--font-size-regular);
        list-style: none;
      }

      .body ul {
        list-style: disc;
      }

      .body li:nth-child(2) span {
        margin-right: 1rem;
      }

      @media (max-width: 768px) {
        .body {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudstaffInternshipComponent {
  protected ts = inject(ThemeService);
  protected ms = inject(ModalService);
}
