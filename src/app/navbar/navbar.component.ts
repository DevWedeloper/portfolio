import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { sections } from '../shared/ui/components/page-nav/page-nav.component';
import { UpperFirstPipe } from '../shared/ui/pipes/upper-first.pipe';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { NavbarThemeComponent } from './navbar-theme/navbar-theme.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    UpperFirstPipe,
    NavbarThemeComponent,
    NavbarMobileComponent,
  ],
  host: {
    class:
      'fixed z-10 flex h-12 w-full items-center justify-between px-[9%] py-8 text-text-color backdrop-blur-sm max-lg:px-[3%] max-md:bg-primary-color',
  },
  template: `
    <h1 class="text-3xl">Nathan.</h1>

    <nav>
      <app-navbar-mobile class="navbar-mobile hidden max-md:flex" />

      <ul class="flex max-md:hidden">
        @for (section of sections(); track $index) {
          <li
            class="flex px-6 [&:nth-last-child(2)]:border-r-4 [&:nth-last-child(2)]:[border-right:solid]"
          >
            <a
              [routerLink]="[]"
              [fragment]="section.id"
              [ngClass]="{ 'text-main-color': section.isActive }"
              class="-m-2 rounded-lg p-2 text-regular hover:text-main-color"
            >
              {{ section.id | upperFirst }}
            </a>
          </li>
        }
        <li class="flex px-6 pr-0">
          <app-navbar-theme />
        </li>
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected sections = sections;
}
