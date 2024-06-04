import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[@fadeInOut]': 'true',
    '[style.left.px]': 'left()',
    '[style.top.px]': 'top()',
  },
  template: `
    {{ text() }}
  `,
  styles: [
    `
      :host {
        position: fixed;
        z-index: 3;
        background-color: var(--text-color);
        border-radius: 0.5rem;
        color: var(--text-color-reverse);
        padding: 0.5rem;
        font-size: var(--font-size-tooltip-desktop);
        margin-top: 5px;
        transform: translateX(-50%);
      }

      :host::before {
        content: '';
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid var(--text-color);
        position: absolute;
        left: calc(50% - 5px);
        top: -4px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('150ms', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        style({ opacity: '1', pointerEvents: 'none' }),
        animate('150ms', style({ opacity: '0', pointerEvents: 'none' })),
      ]),
    ]),
  ],
})
export class TooltipComponent {
  text = input.required<string>();
  left = input.required<number>();
  top = input.required<number>();
}
