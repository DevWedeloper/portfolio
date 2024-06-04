import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
} from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { ScrollIndicatorComponent } from './scroll-indicator/scroll-indicator.component';
import { ThemeService } from './shared/data-access/theme.service';
import { PageNavComponent } from './shared/ui/components/page-nav/page-nav.component';

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
    PageNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class AppComponent {
  title = 'portfolio';
  protected isWideScreen!: boolean;
  private ts = inject(ThemeService);

  constructor() {
    afterNextRender(() => {
      this.addScrollAnimation();
      this.ts.checkPreferredTheme();
      this.isWideScreen = window.innerWidth >= 991;
    });
  }

  private addScrollAnimation(): void {
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

    const elements = document.querySelectorAll('.hiddenAnimate');
    elements.forEach((element) => appearOnScroll.observe(element));
  }

  protected onResize(): void {
    this.isWideScreen = window.innerWidth >= 991;
  }
}
