import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { ScrollIndicatorComponent } from './scroll-indicator/scroll-indicator.component';
import { initialClassToRemove } from './shared/ui/components/initial-animation.directive';
import { PageNavComponent } from './shared/ui/components/page-nav/page-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    ScrollIndicatorComponent,
    PageNavComponent,
  ],
  template: `
    <main>
      <app-navbar />
      <app-home />
      <app-about />
      <app-projects />
      <app-contact />
    </main>
    <app-page-nav />
    <app-scroll-indicator class="block max-lg:hidden" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'portfolio';

  constructor() {
    if (typeof IntersectionObserver === 'undefined') return;
    const appearOnScroll = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const direction = entry.target.getAttribute('direction');

            entry.target.classList.remove(...initialClassToRemove.split(' '));

            if (direction === 'top' || direction === 'bottom') {
              entry.target.classList.add(
                'translate-x-0',
                'opacity-100',
                'filter-none',
              );
            } else if (direction === 'left' || direction === 'right') {
              entry.target.classList.add(
                'translate-y-0',
                'opacity-100',
                'filter-none',
              );
            }
            appearOnScroll.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -150px 0px',
      },
    );

    const elements = document.querySelectorAll('[appInitialAnimation]');
    elements.forEach((element) => appearOnScroll.observe(element));
  }
}
