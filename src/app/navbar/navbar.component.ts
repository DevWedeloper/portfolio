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
  signal,
  viewChild
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
    '(window:scroll)': 'onScroll()',
  },
})
export class NavbarComponent implements OnInit, AfterViewInit {
  protected ts = inject(ThemeService);
  private renderer = inject(Renderer2);
  private sectionService = inject(SectionService);
  private el = inject(ElementRef);
  private navbar = viewChild.required<ElementRef<HTMLElement>>('navbar');
  protected activeTabIndex = signal<number | null>(null);
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
    event.preventDefault();
    const targetElement = (event.target as HTMLAnchorElement).getAttribute('href');
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

  protected onScroll(): void {
    this.highlightNavAnchors();
  }

  private highlightNavAnchors(): void {
    const top = window.scrollY;
    const offset = 150;

    this.sections.forEach((section, index) => {
      const sectionTop = section.nativeElement.offsetTop;
      const sectionHeight = section.nativeElement.offsetHeight;

      if (
        top >= sectionTop - offset &&
        top < sectionTop + sectionHeight - offset
      ) {
        this.activeTabIndex.set(index);
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
