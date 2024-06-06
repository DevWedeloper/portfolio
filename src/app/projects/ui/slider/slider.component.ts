import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
} from '@angular/core';
import { SlideDirective } from './slide.directive';

const arrow =
  'user-select-none absolute top-1/2 -translate-y-1/2 cursor-pointer text-5xl text-text-color';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div class="relative flex h-full justify-center">
      <div>
        @if (index !== 0) {
          <div
            class="${arrow} left-0"
            (click)="goToPrevious()"
            (keydown.Enter)="goToPrevious()"
            tabindex="0"
          >
            ❰
          </div>
        }
        @if (index !== slider().length - 1) {
          <div
            class="${arrow} right-0"
            (click)="goToNext()"
            (keydown.Enter)="goToNext()"
            tabindex="0"
          >
            ❱
          </div>
        }
      </div>
      <div class="flex w-[85%] items-center justify-center overflow-hidden">
        <div [@slideAnimation]="index">
          @for (slide of slider(); track i; let i = $index) {
            @if (i === index) {
              <ng-container [ngTemplateOutlet]="slide.template" />
            }
          }
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('slideAnimation', [
      state('void', style({ transform: 'translateX(0)' })),
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  protected index = 0;
  protected slider = contentChildren(SlideDirective);

  goToNext(): void {
    if (this.index < this.slider().length - 1) {
      this.index += 1;
    }
  }

  goToPrevious(): void {
    if (this.index > 0) {
      this.index -= 1;
    }
  }
}
