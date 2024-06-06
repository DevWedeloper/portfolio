import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  TemplateRef,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../../data-access/theme.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [AsyncPipe, NgClass, NgTemplateOutlet],
  host: {
    '[@hostAnimation]': 'true',
    '(document:keydown.escape)': 'onEscapeKeydown()',
  },
  template: `
    <div
      #modalElement
      class="fixed inset-0 z-10 h-full w-full overflow-auto backdrop-blur-sm"
      tabindex="0"
      [ngClass]="
        (ts.isDarkMode$ | async)
          ? 'bg-white bg-opacity-20'
          : 'bg-black bg-opacity-40'
      "
      (click)="ms.close()"
      (keyup.Escape)="ms.close()"
    ></div>
    <div
      [@fadeInOut]
      class="pointer-events-none fixed inset-0 z-10 flex h-full w-full items-center justify-center"
    >
      <div
        class="pointer-events-auto inset-0 rounded-lg bg-primary-color text-text-color"
      >
        <ng-container [ngTemplateOutlet]="contentTemplate()" />
      </div>
    </div>
  `,
  animations: [
    trigger('hostAnimation', [
      transition(':leave', [query('@fadeInOut', animateChild())]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50%) scale(0.1)' }),
        animate('200ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('200ms', style({ opacity: 0, transform: 'translateY(-2rem)' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  protected ms = inject(ModalService);
  protected ts = inject(ThemeService);
  private renderer = inject(Renderer2);
  contentTemplate = input.required<TemplateRef<HTMLElement>>();
  private modalElement = viewChild.required<ElementRef>('modalElement');

  constructor() {
    effect(() => {
      this.renderer
        .selectRootElement(this.modalElement().nativeElement)
        .focus();
    });
  }

  protected onEscapeKeydown(): void {
    this.ms.close();
  }
}
