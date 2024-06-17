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
  template: `
    <div
      class="fixed z-10 flex h-12 w-full items-center justify-between px-[9%] py-8 text-text-color before:absolute before:inset-0 before:-z-10 before:backdrop-blur-sm max-lg:px-[3%] max-md:bg-primary-color"
    >
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
                class="-m-2 rounded-lg p-2 text-regular hover:text-main-color hover:backdrop-blur-sm"
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected sections = sections;
}
