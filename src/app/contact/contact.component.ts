import { AsyncPipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../shared/data-access/theme.service';
import { InitialAnimationDirective } from '../shared/ui/components/initial-animation.directive';
import { MainSectionDirective } from '../shared/ui/components/main-section.directive';
import { ModalComponent } from '../shared/ui/components/modal/modal.component';
import { ModalService } from '../shared/ui/components/modal/modal.service';
import { ContactService } from './data-access/contact.service';
import { CopyTextComponent } from './ui/copy-text/copy-text.component';
import { FeedbackFailComponent } from './ui/feedback-fail/feedback-fail.component';
import { FeedbackSuccessComponent } from './ui/feedback-success/feedback-success.component';
import { FormComponent } from './ui/form/form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgStyle,
    AsyncPipe,
    ReactiveFormsModule,
    ModalComponent,
    FormComponent,
    CopyTextComponent,
    FeedbackSuccessComponent,
    FeedbackFailComponent,
    MainSectionDirective,
    InitialAnimationDirective,
  ],
  template: `
    <section
      appMainSection
      id="contact"
      class="flex gap-8 overflow-x-hidden max-md:flex-col max-md:text-center"
    >
      <div appInitialAnimation direction="left" class="basis-5/12">
        <h3>Contact Me</h3>
        <div class="mt-6 flex">
          <img
            class="mr-4 w-icon-adjust select-none"
            src="assets/images/icons/email.svg"
            alt="Email Icon"
            [ngStyle]="{
              filter:
                (ts.isDarkMode$ | async)
                  ? 'invert(100%) grayscale(100%)'
                  : 'grayscale(100%)',
            }"
          />
          <div class="flex w-full justify-between">
            <p id="emailText">{{ email }}</p>
            <app-copy-text [text]="email"></app-copy-text>
          </div>
        </div>
        <div class="mt-6 flex">
          <img
            class="mr-4 w-icon-adjust select-none"
            src="assets/images/icons/phone.svg"
            alt="Phone Icon"
            [ngStyle]="{
              filter:
                (ts.isDarkMode$ | async)
                  ? 'invert(100%) grayscale(100%)'
                  : 'grayscale(100%)',
            }"
          />
          <div class="flex w-full justify-between">
            <p id="phoneText">{{ phoneNumber }}</p>
            <app-copy-text [text]="phoneNumber"></app-copy-text>
          </div>
        </div>
      </div>
      <div appInitialAnimation direction="right" class="basis-7/12">
        <app-form (submitForm)="cs.submitForm$.next($event)" />
      </div>
    </section>

    <ng-template #sorryTemplate>
      <app-feedback-fail />
    </ng-template>

    <ng-template #thankYouTemplate>
      <app-feedback-success />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected ts = inject(ThemeService);
  private ms = inject(ModalService);
  protected cs = inject(ContactService);
  private thankYouTemplate =
    viewChild.required<TemplateRef<HTMLElement>>('thankYouTemplate');
  private sorryTemplate =
    viewChild.required<TemplateRef<HTMLElement>>('sorryTemplate');
  protected email = 'vicnathangabrielle@gmail.com';
  protected phoneNumber = '+63 965 558 5778';

  constructor() {
    effect(() => {
      if (this.cs.submitData() === true) this.ms.open(this.thankYouTemplate());
      else if (this.cs.submitData() === false)
        this.ms.open(this.sorryTemplate());
    });
  }
}
