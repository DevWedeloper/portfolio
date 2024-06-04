import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  afterNextRender,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { ThemeService } from '../shared/data-access/theme.service';
import { sections } from '../shared/ui/components/page-nav/page-nav.component';
import { UpperFirstPipe } from '../shared/ui/pipes/upper-first.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, UpperFirstPipe],
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
  private navbar = viewChild.required<ElementRef<HTMLElement>>('navbar');
  protected activeTabIndex = signal<number | null>(null);
  protected sections = sections;

  protected isMenuOpen = false;

  private resizeTimer!: ReturnType<typeof setTimeout>;

  protected isMobile = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      this.isMobile.set(window.innerWidth < 768);
    });
  }

  protected onClick(event: Event) {
    event.preventDefault();
    const targetElement = (event.target as HTMLAnchorElement).getAttribute(
      'href',
    );
    if (targetElement) {
      this.scrollToElement(targetElement);
    }
  }

  private scrollToElement(targetElement: string) {
    const element = document.querySelector(targetElement);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  protected onWindowResize(): void {
    const navbar = this.navbar().nativeElement;
    this.renderer.addClass(navbar, 'resize-animation-stopper');

    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.renderer.removeClass(navbar, 'resize-animation-stopper');
    }, 1);

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
