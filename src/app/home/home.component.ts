import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { TypeEffectService } from '../shared/data-access/type-effect.service';
import { CustomButtonComponent } from '../shared/ui/components/custom-button/button';
import { MainSectionDirective } from '../shared/ui/components/main-section.directive';
import { HighlightTextDirective } from '../shared/ui/directives/highlight-text.directive';
import { HomeHeroImageComponent } from './ui/home-hero-image/home-hero-image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HighlightTextDirective,
    HomeHeroImageComponent,
    CustomButtonComponent,
    MainSectionDirective,
  ],
  template: `
    <section appMainSection id="home">
      <div class="home-content hiddenAnimate from-left">
        <h2>Hi, I'm Nathan</h2>
        <h2 class="type-effect-text">
          And I'm a
          <span appHighlightText>
            <h2 class="type-effect-text" id="type-effect" #typeEffectTarget>
              Software Engineer!
            </h2>
          </span>
        </h2>
        <p>
          A MEAN stack developer fueled by my passion for coding. Let's turn
          ideas into reality together!
        </p>
        <div class="link-container">
          <a
            href="https://www.linkedin.com/in/nathan-dungca-94975525a/"
            target="_blank"
            class="icon-container"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>LinkedIn Icon</title>
              <path
                d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
              />
              <path
                d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
              />
              <path
                d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/DevWedeloper"
            target="_blank"
            class="icon-container"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>GitHub Icon</title>
              <path
                d="M21.035 5.257c.91 1.092 1.364 2.366 1.364 3.822 0 5.277-3.002 6.824-5.823 7.279.364.637.455 1.365.455 2.093v3.73c0 .455-.273.728-.637.728a.718.718 0 0 1-.728-.728v-3.73a2.497 2.497 0 0 0-.728-2.093l.455-1.183c2.821-.364 5.733-1.274 5.733-6.187 0-1.183-.455-2.275-1.274-3.185l-.182-.727a4.04 4.04 0 0 0 .09-2.73c-.454.09-1.364.273-2.91 1.365l-.547.09a13.307 13.307 0 0 0-6.55 0l-.547-.09C7.57 2.71 6.66 2.437 6.204 2.437c-.273.91-.273 1.91.09 2.73l-.181.727c-.91.91-1.365 2.093-1.365 3.185 0 4.822 2.73 5.823 5.732 6.187l.364 1.183c-.546.546-.819 1.274-.728 2.002v3.821a.718.718 0 0 1-.728.728.718.718 0 0 1-.728-.728V20.18c-3.002.637-4.185-.91-5.095-2.092-.455-.546-.819-1.001-1.274-1.092-.09-.091-.364-.455-.273-.819.091-.364.455-.637.82-.455.91.182 1.455.91 2 1.547.82 1.092 1.639 2.092 4.095 1.547v-.364c-.09-.728.091-1.456.455-2.093-2.73-.546-5.914-2.093-5.914-7.279 0-1.456.455-2.73 1.365-3.822-.273-1.273-.182-2.638.273-3.73l.455-.364C5.749 1.073 7.023.8 9.66 2.437a13.673 13.673 0 0 1 6.642 0C18.851.708 20.216.98 20.398 1.072l.455.364c.455 1.274.546 2.548.182 3.821z"
              />
            </svg>
          </a>
        </div>
        <a
          custom-button
          href="assets/pdfs/resume.pdf"
          class="resume btn"
          download
        >
          Download Résumé
        </a>
      </div>
      <app-home-hero-image />
    </section>
  `,
  styles: [
    `
      section {
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        overflow-x: hidden;
      }

      section > *:nth-child(1) {
        flex: 1 1 70%;
      }

      section > *:nth-child(2) {
        flex: 1 1 30%;
      }

      .home-content .type-effect-text {
        font-size: calc(var(--font-size-big-desktop) - 0.5rem);
      }

      .home-content .resume {
        display: inline-block;
        padding: 1rem 2rem;
        font-weight: 600;
        margin-top: 1rem;
      }

      #type-effect {
        display: inline;
        animation:
          typing 2s steps(22),
          blink 0.5s step-end infinite alternate;
        overflow: hidden;
        border-right: 3px solid var(--text-color);
      }

      .type-effect-text {
        display: inline-block;
      }

      .link-container {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }

      .link-container a:hover {
        scale: 1.1;
        transition: scale 50ms ease-in-out;
        cursor: pointer;
      }

      .icon-container svg {
        width: 2rem;
        fill: var(--text-color);
      }

      @keyframes typing {
        from {
          width: 0;
        }
      }

      @keyframes blink {
        50% {
          border-color: transparent;
        }
      }

      @media (max-width: 991px) {
        .home-content .type-effect-text {
          font-size: calc(var(--font-size-big-tablet) - 0.5rem);
        }
      }

      @media (max-width: 768px) {
        section {
          flex-direction: column-reverse;
        }

        section > *:nth-child(1),
        section > *:nth-child(2) {
          flex: none;
        }

        .home-content {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .home-content .type-effect-text {
          font-size: calc(var(--font-size-big-mobile) - 0.5rem);
        }
      }

      @media (max-width: 500px) {
        .home-content .type-effect-text {
          font-size: calc(var(--font-size-big-small-mobile) - 0.55rem);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private tes = inject(TypeEffectService);
  private typeEffectTarget =
    viewChild.required<ElementRef<HTMLElement>>('typeEffectTarget');

  constructor() {
    afterNextRender(() => {
      this.tes.addTypeEffect(
        {
          phrases: ['Software Engineer!', 'Full-stack Engineer!'],
          typeSpeed: 55,
          reverseSpeed: 40,
          reverseDelay: 1000,
          loop: true,
        },
        this.typeEffectTarget(),
      );
    });
  }
}
