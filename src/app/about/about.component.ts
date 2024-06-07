import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InitialAnimationDirective } from '../shared/ui/components/initial-animation.directive';
import { MainSectionDirective } from '../shared/ui/components/main-section.directive';
import { AboutHeroImageComponent } from './ui/about-hero-image/about-hero-image.component';
import { AboutTabComponent } from './ui/about-tab/about-tab.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    AboutHeroImageComponent,
    AboutTabComponent,
    MainSectionDirective,
    InitialAnimationDirective,
  ],
  template: `
    <section appMainSection id="about">
      <app-about-hero-image appInitialAnimation direction="left" />
      <div appInitialAnimation direction="right">
        <h3>About Me</h3>
        <p>
          I enjoy creating softwares, I code most of my time. My main stack is
          MEAN, with experience in clean architecture, reactive programming,
          state management, serverless functions, REST APIs, and many more.
        </p>
        <app-about-tab />
      </div>
    </section>
  `,
  styles: [
    `
      section {
        display: flex;
        gap: 2rem;
        overflow-x: hidden;
      }

      section > *:nth-child(1) {
        flex: 1 1 30%;
      }

      section > *:nth-child(2) {
        flex: 1 1 70%;
      }

      section p {
        padding-top: 0.5rem;
      }

      @media (max-width: 768px) {
        section {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        section > *:nth-child(1),
        section > *:nth-child(2) {
          flex: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
