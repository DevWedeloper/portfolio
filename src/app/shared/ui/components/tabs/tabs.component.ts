import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChildren,
  signal,
  viewChildren,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, map, merge } from 'rxjs';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet],
  template: `
    <ul class="tabs">
      @for (tab of tabs(); track $index) {
        <li
          #tabLinks
          class="tab-links"
          [ngClass]="activeTabIndex() === $index ? 'active' : ''"
          (click)="activeTabIndex.set($index)"
          (keydown.Enter)="activeTabIndex.set($index)"
          tabindex="0"
        >
          <p>{{ tab.title() }}</p>
        </li>
      }
      <li
        class="tab-line"
        [style.width]="linePosition()?.width"
        [style.left]="linePosition()?.left"
        [style.top]="linePosition()?.top"
      ></li>
    </ul>
    <ng-container [ngTemplateOutlet]="selectedTabTpl()" />
  `,
  styles: [
    `
      .tabs {
        position: relative;
        display: flex;
        list-style: none;
        padding: 0.5rem;
      }

      .tab-links {
        font-size: var(--font-size-regular);
        padding: 0.5rem;
        cursor: pointer;
      }

      .tab-line {
        position: absolute;
        height: 5px;
        background-color: var(--main-color);
        border-radius: 1rem;
        transition: all 0.3s ease-in-out;
      }

      @media (max-width: 768px) {
        .tabs {
          justify-content: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  private tabLinks = viewChildren<ElementRef<HTMLElement>>('tabLinks');
  protected tabs = contentChildren(TabDirective);
  protected activeTabIndex = signal<number | null>(null);

  protected activeTabElement = computed(() => {
    const tabLinks = this.tabLinks();
    if (!tabLinks.length) return null;

    const selected = this.activeTabIndex();

    if (!selected) return tabLinks[0];

    return tabLinks[selected];
  });

  protected selectedTabTpl = computed(() => {
    const tabs = this.tabs();
    if (!tabs.length) return null;

    const selected = this.activeTabIndex();

    if (!selected) return tabs[0].template;

    return tabs[selected].template;
  });

  private resize$ = new Observable<{
    width: string;
    left: string;
    top: string;
  }>((subscriber) => {
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      const width = this.activeTabElement()?.nativeElement.offsetWidth + 'px';
      const left = this.activeTabElement()?.nativeElement.offsetLeft + 'px';
      const top = this.activeTabElement()?.nativeElement.offsetHeight + 'px';
      subscriber.next({ width, left, top });
    });

    observer.observe(document.body);

    subscriber.add(() => observer.disconnect());
  });

  protected linePosition = toSignal(
    merge(
      toObservable(this.activeTabElement).pipe(
        map((tab) => {
          const width = tab?.nativeElement.offsetWidth + 'px';
          const left = tab?.nativeElement.offsetLeft + 'px';
          const top = tab?.nativeElement.offsetHeight + 'px';
          return { width, left, top };
        }),
      ),
      this.resize$,
    ),
  );
}
