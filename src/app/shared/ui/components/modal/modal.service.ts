import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
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
export class ModalService<T> {
  private appRef = inject(ApplicationRef);
  private modalComponentRef?: ComponentRef<ModalComponent>;
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null);
  private isBodyScrollDisabled = signal(false);

  constructor() {
    effect(() => {
      if (this.isBodyScrollDisabled()) {
        this.renderer.addClass(document.body, 'no-scroll');
      } else {
        this.renderer.removeClass(document.body, 'no-scroll');
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

    this.appRef.attachView(this.modalComponentRef.hostView);

    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<T>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    this.modalComponentRef.setInput('contentTemplate', contentTemplate);

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
