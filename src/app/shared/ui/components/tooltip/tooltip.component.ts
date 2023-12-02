import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

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
      ])
    ]),
  ],
})
export class TooltipComponent {
  @Input() text = '';
  @Input() set left(value: number) {
    this.leftStyle = `${value}px`;
  }
  @Input() set top(value: number) {
    this.topStyle = `${value}px`;
  }
  
  @HostBinding('style.left') leftStyle = '0px';
  @HostBinding('style.top') topStyle = '0px';
  @HostBinding('@fadeInOut') animate = true;
}
