import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, fromEvent } from 'rxjs';
import { sections } from '../shared/ui/components/page-nav/page-nav.component';

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'app-scroll-indicator',
  template: `
    <div class="container">
      <span class="line" [style.height.%]="progress()"></span>
      @for (shape of sections(); track i; let i = $index) {
        <div class="shapes" [ngClass]="{ active: shape.isActive }"></div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
      }

      :host .container {
        height: 300px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-flow: column;
        position: relative;
      }

      :host .shapes {
        display: block;
        height: 10px;
        width: 10px;
        outline: 1px solid var(--text-color);
        background: transparent;
        transform: rotate(45deg);
        position: relative;
        z-index: 1;
      }

      :host .shapes.active {
        outline: 1px solid var(--main-color);
        height: 20px;
        width: 20px;
      }

      .line {
        position: absolute;
        width: 1px;
        background: var(--text-color);
      }
    `,
  ],
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
