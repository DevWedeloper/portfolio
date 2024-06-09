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
  host: {
    class:
      'group block h-full overflow-hidden rounded-lg bg-secondary-color p-6',
  },
  template: `
    <div
      class="mb-2 h-[125px] w-full bg-cover bg-center blur-sm"
      [style.background-image]="'url(' + src() + ')'"
    ></div>
    <div
      class="supports-hover:translate-y-[95%] supports-hover:transition-transform supports-hover:duration-500 supports-hover:ease-in-out flex h-[calc(100%-125px)] flex-col justify-between gap-2 group-focus-within:translate-y-0 group-hover:translate-y-0"
    >
      <div>
        <h2 class="mb-2 text-regular">{{ title() }}</h2>
        <ul class="flex list-none flex-wrap">
          @for (tag of tags(); track $index) {
            <li class="m-1 rounded-lg bg-main-color p-2 text-text-color">
              {{ tag }}
            </li>
          }
        </ul>
      </div>
      <div class="h-[40vh]">
        <ng-container [ngTemplateOutlet]="cardBody().template" />
      </div>
      <div class="flex justify-center gap-14">
        <a [href]="websiteLink()" target="_blank">
          <img
            class="w-10 select-none"
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
            class="w-10 select-none"
            [src]="
              (ts.isDarkMode$ | async)
                ? 'assets/images/icons/github-light.svg'
                : 'assets/images/icons/github-dark.svg'
            "
            alt="GitHub logo"
          />
        </a>
      </div>
    </div>
  `,
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
