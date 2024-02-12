import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  afterNextRender,
  inject,
} from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, AfterViewInit {
  ts = inject(ThemeService);
  renderer = inject(Renderer2);
  sectionService = inject(SectionService);
  el = inject(ElementRef);
  @ViewChildren('homeLink, aboutLink, contactLink, projectsLink')
  navAnchors!: QueryList<ElementRef>;
  @ViewChild('homeLink', { static: true }) homeLink!: ElementRef<HTMLElement>;
  @ViewChild('navbar', { static: true }) navbar!: ElementRef<HTMLElement>;

  sections!: ElementRef[];
  isMenuOpen = false;

  resizeTimer!: ReturnType<typeof setTimeout>;

  isBodyScrollDisabled = false;
  isMobile = false;

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

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    this.renderer.addClass(navbar, 'resize-animation-stopper');

    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.renderer.removeClass(navbar, 'resize-animation-stopper');
    }, 1);

    this.isMobile = window.innerWidth < 768;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const navbarElement = this.navbar.nativeElement;

    if (target.tagName === 'A' && navbarElement.contains(target)) {
      event.preventDefault();
      const targetElement = target.getAttribute('href');
      if (targetElement) {
        this.scrollToElement(targetElement);
      }
    }
  }

  scrollToElement(targetElement: string) {
    const element = document.querySelector(targetElement);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.highlightNavAnchors();
  }

  highlightNavAnchors(): void {
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

    this.navAnchors.forEach((anchor) => {
      const href = anchor.nativeElement.getAttribute('href');
      const id = href ? href.substr(1) : '';

      if (id === activeSectionId) {
        this.renderer.addClass(anchor.nativeElement, 'active');
      } else {
        this.renderer.removeClass(anchor.nativeElement, 'active');
      }
    });
  }

  menuOnClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleBodyScroll();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.toggleBodyScroll();
  }

  private toggleBodyScroll(): void {
    if (this.isMenuOpen) {
      this.isBodyScrollDisabled = true;
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.isBodyScrollDisabled = false;
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
}
