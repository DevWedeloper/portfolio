import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, fromEvent } from 'rxjs';
import { sections } from '../shared/ui/components/page-nav/page-nav.component';

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'app-scroll-indicator',
  templateUrl: './scroll-indicator.component.html',
  styleUrls: ['./scroll-indicator.component.scss'],
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

      return () => observer.unsubscribe();
    }),
  );
}
