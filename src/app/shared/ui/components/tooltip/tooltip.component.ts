import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  host: {
    class: `
      fixed z-10 mt-[5px] -translate-x-1/2 rounded-lg bg-text-color p-2 text-tooltip text-text-color-reverse 
      before:absolute before:-top-1 before:left-[calc(50%-5px)] before:border-b-[5px] before:border-l-[5px] 
      before:border-r-[5px] before:border-b-text-color before:border-l-transparent before:border-r-transparent 
      before:[border-bottom-style:solid] before:[border-left-style:solid] before:[border-right-style:solid]
    `,
    '[@fadeInOut]': 'true',
    '[style.left.px]': 'left()',
    '[style.top.px]': 'top()',
  },
  template: `
    {{ text() }}
  `,
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
