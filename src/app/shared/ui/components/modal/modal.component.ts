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
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { ThemeService } from 'src/app/shared/data-access/theme.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
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
export class ModalComponent implements AfterViewInit {
  ms = inject(ModalService);
  ts = inject(ThemeService);
  renderer = inject(Renderer2);
  @Input() contentTemplate!: TemplateRef<HTMLElement>;
  @HostBinding('@hostAnimation') animate = true;
  @ViewChild('modalElement') modalElement!: ElementRef;

  ngAfterViewInit(): void {
    this.renderer.selectRootElement(this.modalElement.nativeElement).focus();
  }

  @HostListener('document:keydown.escape', ['$event']) onEscapeKeydown() {
    this.ms.close();
  }
}
