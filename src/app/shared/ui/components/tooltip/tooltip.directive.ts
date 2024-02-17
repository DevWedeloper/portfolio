import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  inject,
  input,
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
  private componentFactoryResolver = inject(ComponentFactoryResolver);
  private injector = inject(Injector);
  private elementRef = inject(ElementRef);
  private appRef = inject(ApplicationRef);
  tooltipText = input.required<string>();

  private tooltipComponent?: ComponentRef<TooltipComponent>;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  protected onMouseEnter(): void {
    if (this.tooltipComponent) {
      return;
    }

    const tooltipComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.tooltipComponent = tooltipComponentFactory.create(this.injector);
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

    this.appRef.detachView(this.tooltipComponent.hostView);
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
