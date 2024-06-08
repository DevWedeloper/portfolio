import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  RendererFactory2,
  TemplateRef,
  createComponent,
  inject,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private appRef = inject(ApplicationRef);
  private modalComponentRef?: ComponentRef<ModalComponent>;
  private renderer = inject(RendererFactory2).createRenderer(null, null);

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

    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  close(): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef?.destroy();
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }
}
