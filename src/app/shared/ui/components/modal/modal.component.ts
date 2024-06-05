import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
  host: {
    '[@hostAnimation]': 'true',
    '(document:keydown.escape)': 'onEscapeKeydown()',
  },
  template: `
    <div
      #modalElement
      class="modal-backdrop"
      tabindex="0"
      [ngStyle]="{
        'background-color':
          (ts.isDarkMode$ | async)
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.4)',
      }"
      (click)="ms.close()"
      (keyup.Escape)="ms.close()"
    ></div>
    <div [@fadeInOut] class="modal-container">
      <div class="modal-content">
        <ng-container *ngTemplateOutlet="contentTemplate()" />
      </div>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        position: fixed;
        z-index: 3;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        backdrop-filter: blur(5px);
      }

      .modal-container {
        position: fixed;
        z-index: 3;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
      }

      .modal-content {
        inset: 0;
        background-color: var(--primary-color);
        color: var(--text-color);
        border-radius: 0.5rem;
        pointer-events: auto;
      }
    `,
  ],
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
