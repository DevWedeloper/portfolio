import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../shared/data-access/theme.service';
import { sections } from '../shared/ui/components/page-nav/page-nav.component';
import { UpperFirstPipe } from '../shared/ui/pipes/upper-first.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, NgStyle, AsyncPipe, RouterLink, UpperFirstPipe],
  host: {
    '(window:resize)': 'onWindowResize()',
  },
  template: `
    <nav class="navbar">
      <h1>Nathan.</h1>
      @if (isMobile()) {
        <div class="navbar-mobile">
          <span
            class="icon-link theme-icon"
            (click)="ts.themeOnClick()"
            (keydown.Enter)="ts.themeOnClick()"
            tabindex="0"
          ></span>
          <span
            class="icon-link icon"
            (click)="menuOnClick()"
            (keydown.Enter)="menuOnClick()"
            tabindex="0"
            [ngStyle]="{
              filter:
                (ts.isDarkMode$ | async)
                  ? 'invert(100%) grayscale(100%)'
                  : 'grayscale(100%)',
            }"
          >
            <img
              id="menu-icon"
              src="{{
                isMenuOpen
                  ? 'assets/images/icons/close.svg'
                  : 'assets/images/icons/menu.svg'
              }}"
              [alt]="isMenuOpen ? 'Menu Icon' : 'Close Icon'"
            />
          </span>
        </div>
      }
      <ul [ngStyle]="{ transform: isMenuOpen ? 'translateX(0)' : '' }">
        @for (section of sections(); track $index) {
          <li>
            <a
              [routerLink]="[]"
              [fragment]="section.id"
              [ngClass]="{ active: section.isActive }"
            >
              {{ section.id | upperFirst }}
            </a>
          </li>
        }
        <li class="flex items-center">
          <span
            class="icon-link theme-icon"
            (click)="ts.themeOnClick()"
            (keydown.Enter)="ts.themeOnClick()"
            tabindex="0"
          ></span>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .navbar {
        position: fixed;
        height: 48px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 9%;
        color: var(--text-color);
        z-index: 2;
      }

      .navbar::before {
        content: '';
        position: absolute;
        inset: 0;
        backdrop-filter: blur(3px);
        z-index: -1;
      }

      .navbar h1 {
        font-size: 2rem;
      }

      .navbar ul {
        display: flex;
      }

      .navbar li {
        display: flex;
        list-style: none;
        padding: 0 25px;
      }

      .navbar li:nth-last-child(2) {
        border-right: 3px solid;
      }

      .navbar li:last-child {
        padding-right: 0;
      }

      .navbar li:last-child a {
        border-radius: 50%;
      }

      .navbar li a {
        text-decoration: none;
        font-size: var(--font-size-regular);
        color: var(--text-color);
        padding: 0.5rem;
        margin: -0.5rem;
        border-radius: 0.5rem;
      }

      .navbar li a:hover {
        backdrop-filter: blur(5px);
      }

      .navbar li a:hover,
      .navbar li a.active {
        color: var(--main-color);
      }

      #menu-icon {
        width: 2rem;
        pointer-events: none;
        user-select: none;
        display: none;
      }

      .theme-icon {
        width: 2rem;
        height: 2rem;
        background-image: var(--theme-icon);
        background-size: contain;
        background-position: center;
      }

      .icon-link {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      @media (max-width: 991px) {
        .navbar {
          padding: 2rem 3%;
        }
      }

      @media (max-width: 768px) {
        #menu-icon {
          display: block;
        }

        .theme-icon-menu {
          display: block;
        }

        .navbar-mobile {
          display: flex;
        }

        .navbar-mobile a {
          margin: 0 10px;
        }

        .navbar-mobile a:last-child {
          margin: 0;
        }

        .navbar {
          background-color: var(--primary-color);
        }

        .navbar ul {
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
          height: 100vh;
          background-color: var(--primary-color);
          top: 48px;
          left: 0;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }

        .navbar li {
          margin: 2rem 0;
          font-weight: 700;
        }

        .navbar li:hover {
          filter: blur(0);
        }

        .navbar li:nth-last-child(2) {
          border-right: none;
        }

        .navbar li:nth-last-child(2) {
          padding-bottom: 4rem;
        }

        .navbar li:last-child {
          display: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected ts = inject(ThemeService);
  private renderer = inject(Renderer2);
  protected sections = sections;

  protected isMenuOpen = false;

  protected isMobile = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      this.isMobile.set(window.innerWidth < 768);
    });
  }

  protected onWindowResize(): void {
    this.isMobile.set(window.innerWidth < 768);
  }

  protected menuOnClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleBodyScroll();
  }

  protected closeMenu(): void {
    this.isMenuOpen = false;
    this.toggleBodyScroll();
  }

  private toggleBodyScroll(): void {
    if (this.isMenuOpen) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }
}
