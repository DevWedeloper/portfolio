import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { ScrollIndicatorComponent } from './scroll-indicator/scroll-indicator.component';
import { ThemeService } from './shared/data-access/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    ScrollIndicatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isWideScreen: boolean = window.innerWidth >= 991;
  private ts = inject(ThemeService);

  ngOnInit(): void {
    this.addScrollAnimation();
    this.addButtonEffect();
    this.ts.checkPreferredTheme();
  }

  addScrollAnimation(): void {
    type Options = {
      threshold: number;
      rootMargin: string;
    };

    const appearOptions: Options = {
      threshold: 0,
      rootMargin: '0px 0px -150px 0px',
    };

    const appearOnScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          appearOnScroll.unobserve(entry.target);
        } else {
          return;
        }
      });
    }, appearOptions);

    const elements = document.querySelectorAll('.hidden');
    elements.forEach((element) => appearOnScroll.observe(element));
  }

  addButtonEffect(): void {
    const buttons = Array.from(
      document.querySelectorAll('.btn-effect'),
    ) as HTMLElement[];

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault;
        button.classList.add('animate');
        setTimeout(() => {
          button.classList.remove('animate');
        }, 600);
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isWideScreen = window.innerWidth >= 991;
  }
}
