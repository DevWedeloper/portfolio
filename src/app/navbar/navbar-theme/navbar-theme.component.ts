import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../shared/data-access/theme.service';

@Component({
  selector: 'app-navbar-theme',
  standalone: true,
  host: {
    class: 'flex items-center',
  },
  template: `
    <span
      class="flex h-8 w-8 cursor-pointer items-center bg-contain bg-center [background-image:var(--theme-icon)]"
      (click)="ts.themeOnClick()"
      (keydown.Enter)="ts.themeOnClick()"
      tabindex="0"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarThemeComponent {
  protected ts = inject(ThemeService);
}
