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
import { BehaviorSubject } from 'rxjs';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService<T> {
  private modalComponentRef?: ComponentRef<ModalComponent>;
  private renderer: Renderer2;
  isOpen$ = new BehaviorSubject<boolean>(false);
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
    // Destroy previous modal if it exists
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef?.destroy();
    }

    // Create a component factory
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

    // Create a component reference
    this.modalComponentRef = factory.create(this.injector);

    // Attach the component to the application ref so that it's part of the Angular application
    this.appRef.attachView(this.modalComponentRef.hostView);

    // Get the DOM element from the component
    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<T>)
      .rootNodes[0] as HTMLElement;

    // Append the DOM element to the body
    document.body.appendChild(domElem);

    // Pass the content template to the modal component
    this.modalComponentRef.instance.contentTemplate = contentTemplate;

    this.isOpen$.next(true);
    this.isBodyScrollDisabled = true;
    this.toggleBodyScroll();
  }

  close(): void {
    if (this.modalComponentRef) {
      // Remove the modal component from the body
      this.isOpen$.next(false);
      setTimeout(() => {
        if (this.modalComponentRef) {
          this.appRef.detachView(this.modalComponentRef.hostView);
          this.modalComponentRef?.destroy();
        }
      }, 200);
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
