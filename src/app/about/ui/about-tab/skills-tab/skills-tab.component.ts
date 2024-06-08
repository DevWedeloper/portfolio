import { AsyncPipe, NgOptimizedImage, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../../shared/data-access/theme.service';
import { TooltipDirective } from '../../../../shared/ui/components/tooltip/tooltip.directive';

const tooltip = 'relative h-8 w-8';
const iconsContainer = 'flex gap-2 max-md:justify-center';

@Component({
  selector: 'app-skills-tab',
  standalone: true,
  imports: [AsyncPipe, NgStyle, NgOptimizedImage, TooltipDirective],
  template: `
    <ul
      class="grid grid-cols-[repeat(2,min-content)] gap-2 text-main-color max-md:grid-cols-[1fr]"
    >
      <li>Front-End:</li>
      <li class="${iconsContainer}">
        <span appTooltip tooltipText="HTML" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/html.svg"
            alt="HTML Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="CSS" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/css.svg"
            alt="CSS Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="JavaScript" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/javascript.svg"
            alt="JavaScript Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="Angular" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/angular.svg"
            alt="Angular Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="RxJS" class="${tooltip}">
          <img
            fill
            class="select-none"
            ngSrc="assets/images/icons/rxjs.svg"
            alt="RxJS logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="NgRx" class="${tooltip}">
          <img
            fill
            class="select-none"
            ngSrc="assets/images/icons/ngrx.svg"
            alt="NgRx Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="TypeScript" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/typescript.svg"
            alt="TypeScript Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="SASS" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/sass.svg"
            alt="SASS Logo"
            loading="lazy"
          />
        </span>
      </li>
      <li>Back-End:</li>
      <li class="${iconsContainer}">
        <span appTooltip tooltipText="MongoDB" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/mongodb.svg"
            alt="MongoDB Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="Express.js" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/express-js.svg"
            alt="Express.js Logo"
            loading="lazy"
            [ngStyle]="{
              filter:
                (ts.isDarkMode$ | async)
                  ? 'invert(100%) grayscale(100%)'
                  : 'grayscale(100%)',
            }"
          />
        </span>
        <span appTooltip tooltipText="Node.js" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/node-js.svg"
            alt="Node.js Logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="TypeScript" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/typescript.svg"
            alt="TypeScript Logo"
            loading="lazy"
          />
        </span>
      </li>
      <li>Tools:</li>
      <li class="${iconsContainer}">
        <span appTooltip tooltipText="Git" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/git.svg"
            alt="Git logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="GitHub" class="${tooltip}">
          <img
            class="select-none"
            src="{{
              (ts.isDarkMode$ | async)
                ? 'assets/images/icons/github-light.svg'
                : 'assets/images/icons/github-dark.svg'
            }}"
            alt="GitHub logo"
          />
        </span>
      </li>
      <li>Technologies:</li>
      <li class="${iconsContainer}">
        <span appTooltip tooltipText="AWS" class="${tooltip}">
          <img
            class="select-none"
            src="{{
              (ts.isDarkMode$ | async)
                ? 'assets/images/icons/aws-light.svg'
                : 'assets/images/icons/aws-dark.svg'
            }}"
            alt="AWS logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="Rest API" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/rest-api.svg"
            alt="Rest API logo"
            loading="lazy"
            [ngStyle]="{
              filter:
                (ts.isDarkMode$ | async)
                  ? 'invert(100%) grayscale(100%)'
                  : 'grayscale(100%)',
            }"
          />
        </span>
        <span
          appTooltip
          tooltipText="Google Cloud Functions"
          class="${tooltip}"
        >
          <img
            class="select-none"
            src="assets/images/icons/google-cloud-functions.svg"
            alt="Google Cloud Functions logo"
            loading="lazy"
          />
        </span>
        <span appTooltip tooltipText="OAuth 2.0" class="${tooltip}">
          <img
            class="select-none"
            src="assets/images/icons/oauth.svg"
            alt="OAuth 2.0 logo"
            loading="lazy"
          />
        </span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsTabComponent {
  protected ts = inject(ThemeService);
}
