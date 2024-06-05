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

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div class="slider">
      <div class="arrows">
        @if (index !== 0) {
          <div
            class="left-arrow"
            (click)="goToPrevious()"
            (keydown.Enter)="goToPrevious()"
            tabindex="0"
          >
            ❰
          </div>
        }
        @if (index !== slider().length - 1) {
          <div
            class="right-arrow"
            (click)="goToNext()"
            (keydown.Enter)="goToNext()"
            tabindex="0"
          >
            ❱
          </div>
        }
      </div>
      <div class="slide-container">
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
  styles: [
    `
      .slider {
        display: flex;
        justify-content: center;
        position: relative;
        height: 100%;
      }

      .left-arrow,
      .right-arrow {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 45px;
        color: var(--text-color);
        z-index: 1;
        cursor: pointer;
        user-select: none;
      }

      .right-arrow {
        right: 0;
      }

      .left-arrow {
        left: 0;
      }

      .slide-container {
        overflow: hidden;
        width: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
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
