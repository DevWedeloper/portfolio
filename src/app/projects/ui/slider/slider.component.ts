import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  signal,
} from '@angular/core';
import { SlideDirective } from './slide.directive';

const arrow =
  'user-select-none absolute top-1/2 -translate-y-1/2 cursor-pointer text-5xl text-text-color';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass],
  host: {
    class: 'relative flex h-full justify-center',
  },
  template: `
    @if (index() !== 0) {
      <button class="${arrow} left-0" (click)="goToPrevious()">
        <span>❰</span>
      </button>
    }
    @if (index() !== slider().length - 1) {
      <button class="${arrow} right-0" (click)="goToNext()">
        <span>❱</span>
      </button>
    }
    <div class="flex w-[85%] items-center overflow-x-hidden">
      @for (slide of slider(); track $index) {
        <div
          [@slideAnimation]="index()"
          [ngClass]="index() === $index ? 'block' : 'hidden'"
          class="m-auto"
        >
          <ng-container [ngTemplateOutlet]="slide.template" />
        </div>
      }
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
  protected index = signal(0);
  protected slider = contentChildren(SlideDirective);

  protected goToNext(): void {
    if (this.index() < this.slider().length - 1) {
      this.index.update((i) => i + 1);
    }
  }

  protected goToPrevious(): void {
    if (this.index() > 0) {
      this.index.update((i) => i - 1);
    }
  }
}
