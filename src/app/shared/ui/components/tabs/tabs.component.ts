import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChildren,
  signal,
  viewChild,
  viewChildren,
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
  protected tabs = contentChildren(TabDirective);
  protected activatedTab = computed(() => this.tabs()[0].title());
  protected activeTabId = signal<string | null>(null);
  private activeTabElement = signal<HTMLElement | null>(null);

  protected selectedTabTpl = computed(() => {
    const tabs = this.tabs();
    if (!tabs.length) return null;

    const selected = this.activeTabId();

    if (!selected) return tabs[0].template;

    return tabs.find((tab) => tab.title() === selected)!.template;
  });

  protected linePosition = computed(() => {
    const activeTab = this.activeTabElement();
    const width = activeTab?.offsetWidth + 'px';
    const left = activeTab?.offsetLeft + 'px';
    const top = activeTab?.offsetHeight + 'px';
    return { width, left, top };
  });

  ngAfterViewInit(): void {
    this.activeTabElement.set(this.tabLinks()[0].nativeElement);
    this.updateLinePosition();
  }

  protected onWindowResize(): void {
    this.updateLinePosition();
  }

  protected setTab(event: Event, tab: string, el: HTMLElement): void {
    this.activeTabId.update(() => tab);
    this.activeTabElement.set(el);
  }

  private updateLinePosition(): void {
    if (this.activeTabElement()) {
      this.line().nativeElement.style.width =
        this.activeTabElement()?.offsetWidth + 'px';
      this.line().nativeElement.style.left =
        this.activeTabElement()?.offsetLeft + 'px';
      this.line().nativeElement.style.top =
        this.activeTabElement()?.offsetHeight + 'px';
    }
  }
}
