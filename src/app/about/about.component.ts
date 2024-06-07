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
    <section
      appMainSection
      id="about"
      class="flex gap-8 overflow-x-hidden max-md:flex-col max-md:items-center max-md:text-center"
    >
      <app-about-hero-image
        appInitialAnimation
        direction="left"
        class="basis-4/12 max-md:flex-none"
      />
      <div
        appInitialAnimation
        direction="right"
        class="basis-8/12 max-md:flex-none"
      >
        <h3>About Me</h3>
        <p class="mt-2">
          I enjoy creating softwares, I code most of my time. My main stack is
          MEAN, with experience in clean architecture, reactive programming,
          state management, serverless functions, REST APIs, and many more.
        </p>
        <app-about-tab />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
