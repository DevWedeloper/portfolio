import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  
  resizeTimer: any;

  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.highlightNavLinks();
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

  highlightNavLinks(): void {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
  
    window.addEventListener('scroll', () => {
      sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
          navLinks.forEach((links) => {
            links.classList.remove('active');
            document.querySelector(`nav ul li a[href*='${id}']`)?.classList.add('active');
          });
        }
      });
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
    const navbar = document.querySelector('.navbar') as HTMLElement;
    this.isMenuOpen = !this.isMenuOpen;
    navbar.classList.toggle('active');
  }

  closeMenu(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;

    this.isMenuOpen = false;;

    navbar.classList.remove('active');
  }
  
}
