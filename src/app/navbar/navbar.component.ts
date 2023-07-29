import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { SectionService } from 'src/services/section.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChildren('homeLink, aboutLink, contactLink') navAnchors!: QueryList<ElementRef>;
  @ViewChild('homeLink', { static: true }) homeLink!: ElementRef<HTMLElement>;

  sections!: ElementRef[];
  isMenuOpen: boolean = false;
  
  resizeTimer: any;

  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService,
    private sectionService: SectionService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.sections = this.sectionService.getSections();
    this.checkPreferredTheme();
  }

  ngAfterViewInit(): void {
    this.highlightNavAnchors();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    this.renderer.addClass(navbar, 'resize-animation-stopper');

    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.renderer.removeClass(navbar, 'resize-animation-stopper');
    }, 1);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.closest('.navbar')) {
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

  checkPreferredTheme(): void {
    const preferredTheme = localStorage.getItem('preferredTheme');

    if (preferredTheme === 'dark') {
      this.sharedService.setIsDarkMode(true);
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.sharedService.setIsDarkMode(false);
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.highlightNavAnchors();
  }

  highlightNavAnchors(): void {
    const top = window.scrollY;
    const offset = 150;

    let activeSectionId: string | null = null;
    this.sections.forEach((section) => {
      const sectionTop = section.nativeElement.offsetTop;
      const sectionHeight = section.nativeElement.offsetHeight;

      if (top >= sectionTop - offset && top < sectionTop + sectionHeight - offset) {
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

  themeOnClick(): void {
    const isDarkMode = this.sharedService.getIsDarkMode();
    this.sharedService.setIsDarkMode(!isDarkMode);
    if (this.sharedService.getIsDarkMode()) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('preferredTheme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('preferredTheme', 'light');
    }
  }

  isDarkMode(): boolean {
    return this.sharedService.getIsDarkMode();
  }

  menuOnClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;;
  }
  
}
