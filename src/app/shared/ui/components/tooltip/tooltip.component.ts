import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
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
  host: {
    '[@fadeInOut]': 'true',
    '[style.left.px]': 'left()',
    '[style.top.px]': 'top()',
  },
})
export class TooltipComponent {
  text = input.required<string>();
  left = input.required<number>();
  top = input.required<number>();
}
