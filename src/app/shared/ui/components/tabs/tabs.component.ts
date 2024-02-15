import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  input,
  viewChild,
  viewChildren
} from '@angular/core';

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
  tabsList = input.required<string[]>();
  @Output() tabChange = new EventEmitter<string>();
  protected activatedTab = 'Skills';
  private activeTabElement: HTMLElement | undefined;

  ngAfterViewInit(): void {
    this.setInitialActiveTab();
    this.updateLinePosition();
  }

  protected onWindowResize(): void {
    this.updateLinePosition();
  }

  setTab(event: Event, tab: string): void {
    this.activatedTab = tab;
    this.tabChange.emit(this.activatedTab);
    this.activeTabElement = event.currentTarget as HTMLElement;
    this.updateLinePosition();
  }

  private setInitialActiveTab(): void {
    const initialActiveTab = this.tabLinks().find((el) =>
      el.nativeElement.classList.contains('active'),
    );
    if (initialActiveTab) {
      this.activeTabElement = initialActiveTab.nativeElement;
      this.updateLinePosition();
    }
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
