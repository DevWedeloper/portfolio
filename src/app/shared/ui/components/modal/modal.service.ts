import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  TemplateRef,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService<T> {
  private modalComponentRef?: ComponentRef<ModalComponent>;
  private renderer: Renderer2;
  isBodyScrollDisabled = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  open(contentTemplate: TemplateRef<HTMLElement>): void {
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

    this.modalComponentRef.instance.contentTemplate = contentTemplate;

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
