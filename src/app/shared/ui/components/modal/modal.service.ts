import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  RendererFactory2,
  TemplateRef,
  inject,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService<T> {
  private componentFactoryResolver = inject(ComponentFactoryResolver);
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private modalComponentRef?: ComponentRef<ModalComponent>;
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null);
  isBodyScrollDisabled = false;

  open(contentTemplate: TemplateRef<unknown>): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef?.destroy();
    }

    const factory =
      this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

    this.modalComponentRef = factory.create(this.injector);

    this.appRef.attachView(this.modalComponentRef.hostView);

    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<T>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    this.modalComponentRef.setInput('contentTemplate', contentTemplate);

    this.isBodyScrollDisabled = true;
    this.toggleBodyScroll();
  }

  close(): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef?.destroy();
      this.isBodyScrollDisabled = false;
      this.toggleBodyScroll();
    }
  }

  private toggleBodyScroll(): void {
    if (this.isBodyScrollDisabled) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
}
