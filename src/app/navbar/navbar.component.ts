import { Component, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  
  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.highlightNavLinks();
    this.checkPreferredTheme();
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
