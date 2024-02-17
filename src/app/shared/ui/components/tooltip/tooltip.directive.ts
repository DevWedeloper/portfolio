import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  ViewContainerRef,
  inject,
  input
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class TooltipDirective {
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  tooltipText = input.required<string>();

  private tooltipComponent?: ComponentRef<TooltipComponent>;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  protected onMouseEnter(): void {
    if (this.tooltipComponent) {
      return;
    }

    this.tooltipComponent = this.viewContainerRef.createComponent(TooltipComponent);
    this.document.body.appendChild(
      this.tooltipComponent.location.nativeElement,
    );
    this.setTooltipComponentProperties();
    this.tooltipComponent.hostView.detectChanges();
  }

  protected onMouseLeave(): void {
    if (!this.tooltipComponent) {
      return;
    }

    this.tooltipComponent.destroy();
    this.tooltipComponent = undefined;
  }

  private setTooltipComponentProperties() {
    if (!this.tooltipComponent) {
      return;
    }
    this.tooltipComponent.setInput('text', this.tooltipText());
    const { left, right, bottom } =
      this.elementRef.nativeElement.getBoundingClientRect();
    this.tooltipComponent.setInput('left', (right - left) / 2 + left);
    this.tooltipComponent.setInput('top', bottom);
  }
}
