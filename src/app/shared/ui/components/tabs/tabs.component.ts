import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChildren,
  effect,
  signal,
  viewChild,
  viewChildren
} from '@angular/core';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onWindowResize()',
  },
})
export class TabsComponent implements AfterViewInit {
  private line = viewChild.required<ElementRef<HTMLElement>>('line');
  private tabLinks = viewChildren<ElementRef<HTMLElement>>('tabLinks');
  private activeTabElement: HTMLElement | undefined;
  protected tabs = contentChildren(TabDirective);
  protected activatedTab = computed(() => this.tabs()[0].title());
  private activeTabId = signal<string | null>(null);

  selectedTabTpl = computed(() => {
    const tabs = this.tabs();
    if (!tabs.length) return null;

    const selected = this.activeTabId();

    if (!selected) return tabs[0].template;

    return tabs.find((tab) => tab.title() === selected)!.template;
  });

  constructor() {
    effect(() => {
      const initialActiveTab = this.tabLinks().find((el) =>
        el.nativeElement.classList.contains('active'),
      );
      if (initialActiveTab) {
        this.activeTabElement = initialActiveTab.nativeElement;
        this.updateLinePosition();
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateLinePosition();
  }

  protected onWindowResize(): void {
    this.updateLinePosition();
  }

  setTab(event: Event, tab: string): void {
    this.activeTabId.update(() => tab);
    this.activeTabElement = event.currentTarget as HTMLElement;
    this.updateLinePosition();
  }

  private updateLinePosition(): void {
    if (this.activeTabElement) {
      this.line().nativeElement.style.width =
        this.activeTabElement.offsetWidth + 'px';
      this.line().nativeElement.style.left =
        this.activeTabElement.offsetLeft + 'px';
      this.line().nativeElement.style.top =
        this.activeTabElement.offsetHeight + 'px';
    }
  }
}
