import { AsyncPipe, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { CardDirective } from './card.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, AsyncPipe, NgTemplateOutlet],
  template: `
    <div
      class="image-container"
      [style.background-image]="'url(' + src() + ')'"
    ></div>
    <div class="card-content">
      <div class="card-header">
        <h2>{{ title() }}</h2>
        <ul class="tag-list">
          @for (tag of tags(); track $index) {
            <li class="tag">{{ tag }}</li>
          }
        </ul>
      </div>
      <div class="card-body">
        <ng-container [ngTemplateOutlet]="cardBody().template" />
      </div>
      <div class="card-links">
        <a [href]="websiteLink()" target="_blank">
          <img
            class="icon-links"
            src="assets/images/icons/link.svg"
            alt="Link logo"
            [ngStyle]="{
              filter:
                (ts.isDarkMode$ | async)
                  ? 'invert(100%) grayscale(100%)'
                  : 'grayscale(100%)',
            }"
          />
        </a>
        <a [href]="githubLink()" target="_blank">
          <img
            class="icon-links"
            src="{{
              (ts.isDarkMode$ | async)
                ? 'assets/images/icons/github-light.svg'
                : 'assets/images/icons/github-dark.svg'
            }}"
            alt="GitHub logo"
          />
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      $background-image-height: 125px;

      :host {
        display: block;
        background-color: var(--secondary-color);
        border-radius: 0.5rem;
        padding: 1.5rem;
        overflow: hidden;
        height: 100%;
      }

      :host:hover .card-content,
      :host:focus-within .card-content {
        transform: translateY(0);
      }

      .image-container {
        width: 100%;
        height: $background-image-height;
        background-size: cover;
        background-position: center;
        filter: blur(2px);
        margin-bottom: 0.5rem;
      }

      @media (hover) {
        .card-content {
          transform: translateY(95%);
          transition: transform 500ms ease;
        }
      }

      .card-content {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 0.5rem;
        height: calc(100% - $background-image-height);
      }

      .card-header h2 {
        font-size: var(--font-size-regular);
        margin-bottom: 0.5rem;
      }

      .tag-list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
      }

      .tag {
        background-color: var(--main-color);
        color: var(--text-color);
        border-radius: 0.5rem;
        padding: 0.5rem;
        margin: 0.25rem;
      }

      .card-body {
        height: 40vh;
      }

      .card-links {
        display: flex;
        justify-content: center;
        gap: 3.5rem;
      }

      .icon-links {
        width: 3rem;
        user-select: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  protected ts = inject(ThemeService);
  src = input.required<string>();
  title = input.required<string>();
  tags = input.required<string[]>();
  websiteLink = input.required<string>();
  githubLink = input.required<string>();
  protected cardBody = contentChild.required(CardDirective);
}
