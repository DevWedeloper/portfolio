import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  RendererFactory2,
  TemplateRef,
  createComponent,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private appRef = inject(ApplicationRef);
  private modalComponentRef?: ComponentRef<ModalComponent>;
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private isBodyScrollDisabled = signal(false);

  constructor() {
    effect(() => {
      if (typeof document === 'undefined') return;
      if (this.isBodyScrollDisabled()) {
        this.renderer.addClass(document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
      }
    });
  }

  open(contentTemplate: TemplateRef<unknown>): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef?.destroy();
    }

    const environmentInjector = this.appRef.injector;
    this.modalComponentRef = createComponent(ModalComponent, {
      environmentInjector,
    });

    this.modalComponentRef.setInput('contentTemplate', contentTemplate);

    this.appRef.attachView(this.modalComponentRef.hostView);

    document.body.appendChild(this.modalComponentRef.location.nativeElement);

    this.isBodyScrollDisabled.set(true);
  }

  close(): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef?.destroy();
      this.isBodyScrollDisabled.set(false);
    }
  }
}
