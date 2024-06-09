import { NgOptimizedImage, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { ThemeService } from '../../../data-access/theme.service';
import { TooltipDirective } from '../tooltip/tooltip.directive';

@Component({
  selector: 'app-icon-wrapper',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle, TooltipDirective],
  template: `
    <span
      appTooltip
      [tooltipText]="tooltipText()"
      class="relative block h-8 w-8"
      [ngStyle]="
        blackAndWhite()
          ? {
              filter: isDarkMode()
                ? 'invert(100%) grayscale(100%)'
                : 'grayscale(100%)'
            }
          : {}
      "
    >
      <img
        class="select-none"
        fill
        [ngSrc]="src()"
        [alt]="alt()"
        loading="lazy"
      />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconWrapperComponent {
  protected isDarkMode = inject(ThemeService).isDarkMode;
  src = input.required<string>();
  alt = input.required<string>();
  tooltipText = input.required<string>();
  blackAndWhite = input(false, {
    transform: booleanAttribute,
  });
}
