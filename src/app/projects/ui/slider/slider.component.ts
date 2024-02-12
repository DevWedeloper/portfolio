import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
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
export class SliderComponent implements AfterViewInit {
  protected index = 0;
  protected sliderLength = 0;

  @ContentChildren('sliderTemplate') protected slider!: QueryList<
    TemplateRef<HTMLElement>
  >;

  ngAfterViewInit(): void {
    this.sliderLength = this.slider.length;
  }

  goToNext(): void {
    if (this.index < this.sliderLength - 1) {
      this.index += 1;
    }
  }

  goToPrevious(): void {
    if (this.index > 0) {
      this.index -= 1;
    }
  }
}
