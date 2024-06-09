import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../shared/data-access/theme.service';
import { sections } from '../../shared/ui/components/page-nav/page-nav.component';
import { UpperFirstPipe } from '../../shared/ui/pipes/upper-first.pipe';
import { NavbarThemeComponent } from '../navbar-theme/navbar-theme.component';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [NgClass, NgStyle, RouterLink, UpperFirstPipe, NavbarThemeComponent],
  template: `
    <div class="flex">
      <app-navbar-theme />
      <span
        class="flex w-8 cursor-pointer select-none items-center"
        (click)="isMenuOpen.set(!isMenuOpen())"
        (keydown.Enter)="isMenuOpen.set(!isMenuOpen())"
        tabindex="0"
        [ngStyle]="{
          filter: isDarkMode()
            ? 'invert(100%) grayscale(100%)'
            : 'grayscale(100%)'
        }"
      >
        <img
          class="pointer-events-none hidden w-8 select-none max-md:block"
          [src]="
            isMenuOpen()
              ? 'assets/images/icons/close.svg'
              : 'assets/images/icons/menu.svg'
          "
          [alt]="isMenuOpen() ? 'Menu Icon' : 'Close Icon'"
        />
      </span>
    </div>
    <ul
      [ngClass]="isMenuOpen() ? 'translate-x-0' : '-translate-x-full'"
      class="fixed left-0 top-12 flex h-[calc(100%-3rem)] w-full flex-col items-center justify-center bg-primary-color transition-transform duration-300 ease-in-out"
    >
      @for (section of sections(); track $index) {
        <li class="my-8 text-regular font-bold">
          <a
            [routerLink]="[]"
            [fragment]="section.id"
            [ngClass]="{ 'text-main-color': section.isActive }"
            (click)="isMenuOpen.set(false)"
          >
            {{ section.id | upperFirst }}
          </a>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMobileComponent {
  protected isDarkMode = inject(ThemeService).isDarkMode;
  private renderer = inject(Renderer2);
  protected sections = sections;

  protected isMenuOpen = signal(false);

  constructor() {
    effect(() => {
      if (typeof window === 'undefined') return;
      if (this.isMenuOpen()) {
        this.renderer.addClass(document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
      }
    });
  }
}
