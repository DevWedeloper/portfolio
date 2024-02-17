import { CommonModule } from '@angular/common';
import {
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
export class TabsComponent {
  private line = viewChild.required<ElementRef<HTMLElement>>('line');
  private tabLinks = viewChildren<ElementRef<HTMLElement>>('tabLinks');
  protected tabs = contentChildren(TabDirective);
  protected activatedTab = computed(() => this.tabs()[0].title());
  protected activeTabId = signal<{ tab: string; index: number } | null>(null);

  protected activeTabElement = computed(() => {
    const tabLinks = this.tabLinks();
    if (!tabLinks.length) return null;

    const selected = this.activeTabId();

    if (!selected) return tabLinks[0];

    return tabLinks[selected.index];
  });

  protected selectedTabTpl = computed(() => {
    const tabs = this.tabs();
    if (!tabs.length) return null;

    const selected = this.activeTabId();

    if (!selected) return tabs[0].template;

    return tabs.find((tab) => tab.title() === selected.tab)!.template;
  });

  protected linePosition = computed(() => {
    const activeTab = this.activeTabElement();
    const width = activeTab?.nativeElement.offsetWidth + 'px';
    const left = activeTab?.nativeElement.offsetLeft + 'px';
    const top = activeTab?.nativeElement.offsetHeight + 'px';
    return { width, left, top };
  });

  protected setTab(tab: string, index: number): void {
    this.activeTabId.set({ tab, index });
  }
  
  protected onWindowResize(): void {
    this.updateLinePosition();
  }

  private updateLinePosition(): void {
    if (this.activeTabElement()) {
      this.line().nativeElement.style.width =
        this.activeTabElement()?.nativeElement.offsetWidth + 'px';
      this.line().nativeElement.style.left =
        this.activeTabElement()?.nativeElement.offsetLeft + 'px';
      this.line().nativeElement.style.top =
        this.activeTabElement()?.nativeElement.offsetHeight + 'px';
    }
  }
}
