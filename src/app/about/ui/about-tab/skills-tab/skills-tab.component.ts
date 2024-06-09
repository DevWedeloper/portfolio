import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../../shared/data-access/theme.service';
import { IconWrapperComponent } from '../../../../shared/ui/components/icon-wrapper/icon-wrapper.component';

const iconsContainer = 'flex items-center gap-2 max-md:justify-center';

@Component({
  selector: 'app-skills-tab',
  standalone: true,
  imports: [IconWrapperComponent],
  template: `
    <ul
      class="grid grid-cols-[repeat(2,min-content)] gap-2 text-main-color max-md:grid-cols-[1fr]"
    >
      <li>Front-End:</li>
      <li class="${iconsContainer}">
        <app-icon-wrapper
          src="assets/images/icons/html.svg"
          alt="HTML Logo"
          tooltipText="HTML"
        />
        <app-icon-wrapper
          src="assets/images/icons/css.svg"
          alt="CSS Logo"
          tooltipText="CSS"
        />
        <app-icon-wrapper
          src="assets/images/icons/javascript.svg"
          alt="JavaScript Logo"
          tooltipText="JavaScript"
        />
        <app-icon-wrapper
          src="assets/images/icons/angular.svg"
          alt="Angular Logo"
          tooltipText="Angular"
        />
        <app-icon-wrapper
          src="assets/images/icons/rxjs.svg"
          alt="RxJS logo"
          tooltipText="RxJS"
        />
        <app-icon-wrapper
          src="assets/images/icons/ngrx.svg"
          alt="NgRx Logo"
          tooltipText="NgRx"
        />
        <app-icon-wrapper
          src="assets/images/icons/typescript.svg"
          alt="TypeScript Logo"
          tooltipText="TypeScript"
        />
        <app-icon-wrapper
          src="assets/images/icons/sass.svg"
          alt="SASS Logo"
          tooltipText="SASS"
        />
        <app-icon-wrapper
          src="assets/images/icons/tailwind.svg"
          alt="Tailwind Logo"
          tooltipText="Tailwind"
        />
      </li>
      <li>Back-End:</li>
      <li class="${iconsContainer}">
        <app-icon-wrapper
          src="assets/images/icons/express-js.svg"
          alt="Express.js Logo"
          tooltipText="Express.js"
          blackAndWhite
        />
        <app-icon-wrapper
          src="assets/images/icons/node-js.svg"
          alt="Node.js Logo"
          tooltipText="Node.js"
        />
        <app-icon-wrapper
          src="assets/images/icons/typescript.svg"
          alt="TypeScript Logo"
          tooltipText="TypeScript"
        />
      </li>
      <li>Full-Stack:</li>
      <li class="${iconsContainer}">
        <app-icon-wrapper
          src="assets/images/icons/nextjs.svg"
          alt="Next.js Logo"
          tooltipText="Next.js"
          blackAndWhite
        />
        <app-icon-wrapper
          src="assets/images/icons/analogjs.svg"
          alt="Analog.js Logo"
          tooltipText="Analog.js"
        />
      </li>
      <li>Database & ORMs:</li>
      <li class="${iconsContainer}">
        <app-icon-wrapper
          src="assets/images/icons/mongodb.svg"
          alt="MongoDB Logo"
          tooltipText="MongoDB"
        />
        <app-icon-wrapper
          src="assets/images/icons/postgresql.svg"
          alt="PostgreSQL Logo"
          tooltipText="PostgreSQL"
        />
        <app-icon-wrapper
          src="assets/images/icons/drizzle-orm.svg"
          alt="Drizzle ORM Logo"
          tooltipText="Drizzle ORM"
        />
      </li>
      <li>Tools:</li>
      <li class="${iconsContainer}">
        <app-icon-wrapper
          src="assets/images/icons/git.svg"
          alt="Git logo"
          tooltipText="Git"
        />
        <app-icon-wrapper
          [src]="
            isDarkMode()
              ? 'assets/images/icons/github-light.svg'
              : 'assets/images/icons/github-dark.svg'
          "
          alt="GitHub logo"
          tooltipText="GitHub"
        />
        <app-icon-wrapper
          src="assets/images/icons/trpc.svg"
          alt="tRPC logo"
          tooltipText="tRPC"
        />
      </li>
      <li>Technologies:</li>
      <li class="${iconsContainer}">
        <app-icon-wrapper
          [src]="
            isDarkMode()
              ? 'assets/images/icons/aws-light.svg'
              : 'assets/images/icons/aws-dark.svg'
          "
          alt="AWS logo"
          tooltipText="AWS"
        />
        <app-icon-wrapper
          src="assets/images/icons/rest-api.svg"
          alt="Rest API logo"
          tooltipText="Rest API"
          blackAndWhite
        />
        <app-icon-wrapper
          src="assets/images/icons/google-cloud-functions.svg"
          alt="Google Cloud Functions logo"
          tooltipText="Google Cloud Functions"
        />
        <app-icon-wrapper
          src="assets/images/icons/oauth.svg"
          alt="OAuth 2.0 logo"
          tooltipText="OAuth 2.0"
        />
        <app-icon-wrapper
          src="assets/images/icons/supabase.svg"
          alt="Supabase logo"
          tooltipText="Supabase"
        />
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsTabComponent {
  protected isDarkMode = inject(ThemeService).isDarkMode;
}
