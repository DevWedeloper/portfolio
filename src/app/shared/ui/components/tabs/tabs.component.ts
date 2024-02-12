import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  input,
} from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterViewInit {
  @ViewChild('line', { static: true }) protected line!: ElementRef<HTMLElement>;
  @ViewChildren('tabLinks') protected tabLinks!: QueryList<
    ElementRef<HTMLElement>
  >;

  tabsList = input.required<string[]>();
  @Output() tabChange = new EventEmitter<string>();
  protected activatedTab = 'Skills';
  private activeTabElement: HTMLElement | undefined;

  ngAfterViewInit(): void {
    this.setInitialActiveTab();
    this.updateLinePosition();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateLinePosition();
  }

  setTab(event: Event, tab: string): void {
    this.activatedTab = tab;
    this.tabChange.emit(this.activatedTab);
    this.activeTabElement = event.currentTarget as HTMLElement;
    this.updateLinePosition();
  }

  private setInitialActiveTab(): void {
    const initialActiveTab = this.tabLinks.find((el) =>
      el.nativeElement.classList.contains('active'),
    );
    if (initialActiveTab) {
      this.activeTabElement = initialActiveTab.nativeElement;
      this.updateLinePosition();
    }
  }

  private updateLinePosition(): void {
    if (this.activeTabElement) {
      this.line.nativeElement.style.width =
        this.activeTabElement.offsetWidth + 'px';
      this.line.nativeElement.style.left =
        this.activeTabElement.offsetLeft + 'px';
      this.line.nativeElement.style.top =
        this.activeTabElement.offsetHeight + 'px';
    }
  }
}
