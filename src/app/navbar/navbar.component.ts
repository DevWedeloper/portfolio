import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  sections!: HTMLElement[];
  navAnchors!: HTMLElement[];
  isMenuOpen: boolean = false;
  
  resizeTimer: any;

  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.sections = Array.from(document.querySelectorAll('section'));
    this.navAnchors = Array.from(document.querySelectorAll('.navbar a'));
    this.checkPreferredTheme();
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
    this.highlightNavLinks();
  }

  highlightNavLinks(): void {
    const top = window.scrollY;
    const offset = 150;

    let activeSectionId: string | null = null;
    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (top >= sectionTop - offset && top < sectionTop + sectionHeight - offset) {
        activeSectionId = section.getAttribute('id');
      }
    });

    this.navAnchors.forEach((anchor) => {
      const href = anchor.getAttribute('href');
      const id = href ? href.substr(1) : '';

      if (id === activeSectionId) {
        this.renderer.addClass(anchor, 'active');
      } else {
        this.renderer.removeClass(anchor, 'active');
      }
    });
  }

  themeOnClick(): void {
    const isDarkMode = this.sharedService.getIsDarkMode();
    this.sharedService.setIsDarkMode(!isDarkMode);
    const aboutImage = document.querySelector('.about-img') as HTMLElement;

    if (this.sharedService.getIsDarkMode()) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('preferredTheme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('preferredTheme', 'light');
    }
    aboutImage.classList.add('blur-animation');
    
    aboutImage.addEventListener('animationend', () => {
      aboutImage.classList.remove('blur-animation');
    }, { once: true });
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
