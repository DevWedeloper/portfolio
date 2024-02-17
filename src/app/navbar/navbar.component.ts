import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  afterNextRender,
  inject,
  viewChild,
  viewChildren,
} from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';
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
    '(click)': 'onClick($event)',
    '(window:scroll)': 'onScroll()',
  },
})
export class NavbarComponent implements OnInit, AfterViewInit {
  protected ts = inject(ThemeService);
  private renderer = inject(Renderer2);
  private sectionService = inject(SectionService);
  private el = inject(ElementRef);
  private navAnchors = viewChildren<ElementRef>('navLinks');
  private navbar = viewChild.required<ElementRef<HTMLElement>>('navbar');
  protected links = ['home', 'about', 'projects', 'contact'];

  private sections!: ElementRef[];
  protected isMenuOpen = false;

  private resizeTimer!: ReturnType<typeof setTimeout>;

  protected isMobile!: boolean;

  constructor() {
    afterNextRender(() => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  ngOnInit(): void {
    this.sections = this.sectionService.getSections();
  }

  ngAfterViewInit(): void {
    this.highlightNavAnchors();
  }

  protected onWindowResize(): void {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    this.renderer.addClass(navbar, 'resize-animation-stopper');

    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.renderer.removeClass(navbar, 'resize-animation-stopper');
    }, 1);

    this.isMobile = window.innerWidth < 768;
  }

  protected onClick(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const navbarElement = this.navbar().nativeElement;

    if (target.tagName === 'A' && navbarElement.contains(target)) {
      event.preventDefault();
      const targetElement = target.getAttribute('href');
      if (targetElement) {
        this.scrollToElement(targetElement);
      }
    }
  }

  private scrollToElement(targetElement: string) {
    const element = document.querySelector(targetElement);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  protected onScroll(): void {
    this.highlightNavAnchors();
  }

  private highlightNavAnchors(): void {
    if (typeof window === 'undefined') {
      return;
    }
    const top = window.scrollY;
    const offset = 150;

    let activeSectionId: string | null = null;
    this.sections.forEach((section) => {
      const sectionTop = section.nativeElement.offsetTop;
      const sectionHeight = section.nativeElement.offsetHeight;

      if (
        top >= sectionTop - offset &&
        top < sectionTop + sectionHeight - offset
      ) {
        activeSectionId = section.nativeElement.getAttribute('id');
      }
    });

    this.navAnchors().forEach((anchor) => {
      const href = anchor.nativeElement.getAttribute('href');
      const id = href ? href.substr(1) : '';

      if (id === activeSectionId) {
        this.renderer.addClass(anchor.nativeElement, 'active');
      } else {
        this.renderer.removeClass(anchor.nativeElement, 'active');
      }
    });
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
