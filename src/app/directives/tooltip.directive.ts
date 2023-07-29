import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';

  private tooltipElement!: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (!this.tooltipElement) {
      this.createTooltip();
    }
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'visible');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
    }
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    const tooltipText = this.renderer.createText(this.tooltipText);

    this.renderer.appendChild(this.tooltipElement, tooltipText);
    this.renderer.addClass(this.tooltipElement, 'tooltip-text');
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1');
    this.renderer.setStyle(this.tooltipElement, 'top', 'calc(100% + 1px)');
    this.renderer.setStyle(this.tooltipElement, 'left', '50%');
    this.renderer.setStyle(this.tooltipElement, 'transform', 'translateX(-50%)');
    this.renderer.setStyle(this.tooltipElement, 'background-color', 'var(--text-color)');
    this.renderer.setStyle(this.tooltipElement, 'color', 'var(--text-color-reverse)');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '.5rem');
    this.renderer.setStyle(this.tooltipElement, 'padding', '.5rem');
    this.renderer.setStyle(this.tooltipElement, 'font-size', 'var(--font-size-tooltip-desktop)');
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');

    this.renderer.appendChild(this.elementRef.nativeElement, this.tooltipElement);

    this.renderer.listen(this.tooltipElement, 'mouseenter', () => this.hideTooltip());

  }
}
