import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, fromEvent } from 'rxjs';
import { sections } from '../shared/ui/components/page-nav/page-nav.component';

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'app-scroll-indicator',
  host: { class: 'fixed right-4 top-1/2 -translate-y-1/2' },
  template: `
    <div
      class="relative flex h-[300px] w-[60px] flex-col items-center justify-between"
    >
      <span
        class="absolute w-[1px] bg-text-color"
        [style.height.%]="progress()"
      ></span>
      @for (shape of sections(); track $index) {
        <span
          [ngClass]="
            shape.isActive
              ? 'h-5 w-5 outline-main-color'
              : 'h-2 w-2 outline-text-color'
          "
          class="relative z-10 block rotate-45 bg-transparent outline outline-1"
        ></span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollIndicatorComponent {
  protected sections = sections;
  protected progress = toSignal(
    new Observable<number>((subscriber) => {
      if (typeof window === 'undefined') return;

      const observer = fromEvent(window, 'scroll').subscribe(() => {
        const scroll = window.scrollY || document.documentElement.scrollTop;
        const doc = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
        );
        const win = window.innerHeight || document.documentElement.clientHeight;
        const progress = (scroll / (doc - win)) * 100;
        subscriber.next(progress);
      });

      subscriber.add(() => observer.unsubscribe());
    }),
  );
}
