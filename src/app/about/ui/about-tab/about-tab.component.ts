import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { ModalComponent } from '../../../shared/ui/components/modal/modal.component';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';
import { TabDirective } from '../../../shared/ui/components/tabs/tab.directive';
import { TabsComponent } from '../../../shared/ui/components/tabs/tabs.component';
import { TooltipDirective } from '../../../shared/ui/components/tooltip/tooltip.directive';
import { CloudstaffInternshipComponent } from '../cloudstaff-internship/cloudstaff-internship.component';

@Component({
  selector: 'app-about-tab',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    TabsComponent,
    TabDirective,
    TooltipDirective,
    ModalComponent,
    CloudstaffInternshipComponent,
  ],
  template: `
    <app-tabs>
      <div *appTab="tabs[0]" class="text-main-color">
        <ul class="skills-content tab-content">
          <li class="skills-item">Front-End:</li>
          <li class="skills-item icon-container">
            <span appTooltip tooltipText="HTML">
              <img
                class="w-8 select-none"
                src="assets/images/icons/html.svg"
                alt="HTML Logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="CSS">
              <img
                class="w-8 select-none"
                src="assets/images/icons/css.svg"
                alt="CSS Logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="JavaScript">
              <img
                class="w-8 select-none"
                src="assets/images/icons/javascript.svg"
                alt="JavaScript Logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="Angular">
              <img
                class="w-8 select-none"
                src="assets/images/icons/angular.svg"
                alt="Angular Logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="RxJS">
              <img
                fill
                class="w-8 select-none"
                ngSrc="assets/images/icons/rxjs.svg"
                alt="RxJS logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="NgRx">
              <img
                fill
                class="w-8 select-none"
                ngSrc="assets/images/icons/ngrx.svg"
                alt="NgRx Logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="TypeScript">
              <img
                class="w-8 select-none"
                src="assets/images/icons/typescript.svg"
                alt="TypeScript Logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="SASS">
              <img
                class="w-8 select-none"
                src="assets/images/icons/sass.svg"
                alt="SASS Logo"
                loading="lazy"
              />
            </span>
          </li>
          <li class="skills-item">Back-End:</li>
          <li class="skills-item icon-container">
            <span appTooltip tooltipText="MongoDB">
              <img
                class="w-8 select-none"
                src="assets/images/icons/mongodb.svg"
                alt="MongoDB Logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="Express.js">
              <img
                class="w-8 select-none"
                src="assets/images/icons/express-js.svg"
                alt="Express.js Logo"
                loading="lazy"
                [ngStyle]="{
                  filter:
                    (ts.isDarkMode$ | async)
                      ? 'invert(100%) grayscale(100%)'
                      : 'grayscale(100%)'
                }"
              />
            </span>
            <span appTooltip tooltipText="Node.js">
              <img
                class="w-8 select-none"
                src="assets/images/icons/node-js.svg"
                alt="Node.js Logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="TypeScript">
              <img
                class="w-8 select-none"
                src="assets/images/icons/typescript.svg"
                alt="TypeScript Logo"
                loading="lazy"
              />
            </span>
          </li>
          <li class="skills-item">Tools:</li>
          <li class="skills-item icon-container">
            <span appTooltip tooltipText="Git">
              <img
                class="w-8 select-none"
                src="assets/images/icons/git.svg"
                alt="Git logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="GitHub">
              <img
                class="w-8 select-none"
                src="{{
                  (ts.isDarkMode$ | async)
                    ? 'assets/images/icons/github-light.svg'
                    : 'assets/images/icons/github-dark.svg'
                }}"
                alt="GitHub logo"
              />
            </span>
          </li>
          <li class="skills-item">Technologies:</li>
          <li class="skills-item icon-container">
            <span appTooltip tooltipText="AWS">
              <img
                class="w-8 select-none"
                src="{{
                  (ts.isDarkMode$ | async)
                    ? 'assets/images/icons/aws-light.svg'
                    : 'assets/images/icons/aws-dark.svg'
                }}"
                alt="AWS logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="Rest API">
              <img
                class="w-8 select-none"
                src="assets/images/icons/rest-api.svg"
                alt="Rest API logo"
                loading="lazy"
                [ngStyle]="{
                  filter:
                    (ts.isDarkMode$ | async)
                      ? 'invert(100%) grayscale(100%)'
                      : 'grayscale(100%)'
                }"
              />
            </span>
            <span appTooltip tooltipText="Google Cloud Functions">
              <img
                class="w-8 select-none"
                src="assets/images/icons/google-cloud-functions.svg"
                alt="Google Cloud Functions logo"
                loading="lazy"
              />
            </span>
            <span appTooltip tooltipText="OAuth 2.0">
              <img
                class="w-8 select-none"
                src="assets/images/icons/oauth.svg"
                alt="OAuth 2.0 logo"
                loading="lazy"
              />
            </span>
          </li>
        </ul>
      </div>
      <div *appTab="tabs[1]">
        <ul class="experience-content tab-content">
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
                class="w-icon-adjust cursor-pointer select-none"
                src="assets/images/icons/open-in-new.svg"
                alt="Open In New Icon"
                loading="lazy"
                [ngStyle]="{
                  filter:
                    (ts.isDarkMode$ | async)
                      ? 'invert(100%) grayscale(100%)'
                      : 'grayscale(100%)'
                }"
              />
            </span>
          </li>
        </ul>
      </div>
      <div *appTab="tabs[2]">
        <ul class="education-content tab-content">
          <li><span class="text-main-color">2019 - 2023</span></li>
          <li>
            <span>
              Bachelor of Science in Computer Science at Holy Angel University
            </span>
          </li>
        </ul>
      </div>
    </app-tabs>

    <ng-template #cloudstaffInternship>
      <app-cloudstaff-internship />
    </ng-template>
  `,
  styles: [
    `
      :host {
        width: 100%;
        border-radius: 1rem;
      }

      .tab-content {
        list-style: none;
        font-size: var(--font-size-regular);
        animation: animateToLeft 0.5s ease;
      }

      @keyframes animateToLeft {
        0% {
          transform: translateX(2rem);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .skills-content {
        display: grid;
        grid-template-columns: repeat(2, min-content);
        gap: 0.5rem;
        list-style: none;
      }

      .skills-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
      }

      .icon-container {
        display: flex;
        gap: 0.5rem;
      }

      .experience-content,
      .education-content {
        display: flex;
        flex-direction: column;
      }

      @media (max-width: 768px) {
        .tab-titles {
          justify-content: center;
        }

        .tab-tiles {
          display: flex;
          justify-content: center;
        }

        .skills-content {
          grid-template-columns: 1fr;
        }

        .skills-content li {
          justify-content: center;
        }
      }

      span {
        position: relative;
        width: 2rem;
        height: 2rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutTabComponent {
  protected ts = inject(ThemeService);
  protected ms = inject(ModalService);
  protected tabs = ['Skills', 'Experience', 'Education'];
}
