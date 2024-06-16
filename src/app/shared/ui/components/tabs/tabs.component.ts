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
    <ul class="relative flex list-none p-2 max-md:justify-center">
      @for (tab of tabs(); track $index) {
        <li
          #tabLinks
          class="pointer p-2 text-regular"
          [ngClass]="{ active: activeTabIndex() === $index }"
          (click)="activeTabIndex.set($index)"
          (keydown.Enter)="activeTabIndex.set($index)"
          tabindex="0"
        >
          <p>{{ tab.title() }}</p>
        </li>
      }
      <li
        class="absolute h-1 rounded-2xl bg-main-color transition-all duration-300 ease-in-out"
        [style.width]="linePosition()?.width"
        [style.left]="linePosition()?.left"
        [style.top]="linePosition()?.top"
      ></li>
    </ul>
    @for (tab of tabs(); track $index) {
      <div [ngClass]="activeTabIndex() === $index ? 'block' : 'hidden'">
        <ng-container [ngTemplateOutlet]="tab.template" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  private tabLinks = viewChildren<ElementRef<HTMLElement>>('tabLinks');
  protected tabs = contentChildren(TabDirective);
  protected activeTabIndex = signal<number>(0);

  protected activeTabElement = computed(() => {
    const tabLinks = this.tabLinks();
    if (!tabLinks.length) return null;

    const selected = this.activeTabIndex();

    if (!selected) return tabLinks[0];

    return tabLinks[selected];
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
