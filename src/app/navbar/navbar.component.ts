import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, RouterLink, UpperFirstPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onWindowResize()',
  },
})
export class NavbarComponent {
  protected ts = inject(ThemeService);
  private renderer = inject(Renderer2);
  protected activeTabIndex = signal<number | null>(null);
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
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
}
