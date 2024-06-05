import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../shared/data-access/theme.service';
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
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    FormComponent,
    CopyTextComponent,
    FeedbackSuccessComponent,
    FeedbackFailComponent,
    MainSectionDirective,
  ],
  template: `
    <section appMainSection id="contact">
      <div class="contact-information hiddenAnimate from-left">
        <h3>Contact Me</h3>
        <div class="contact-information-item">
          <img
            class="icon icon-size-adjust"
            src="assets/images/icons/email.svg"
            alt="Email Icon"
            [ngStyle]="{
              filter:
                (ts.isDarkMode$ | async)
                  ? 'invert(100%) grayscale(100%)'
                  : 'grayscale(100%)',
            }"
          />
          <div class="contact-information-item-copy-area">
            <p id="emailText">{{ email }}</p>
            <app-copy-text [text]="email"></app-copy-text>
          </div>
        </div>
        <div class="contact-information-item">
          <img
            class="icon icon-size-adjust"
            src="assets/images/icons/phone.svg"
            alt="Phone Icon"
            [ngStyle]="{
              filter:
                (ts.isDarkMode$ | async)
                  ? 'invert(100%) grayscale(100%)'
                  : 'grayscale(100%)',
            }"
          />
          <div class="contact-information-item-copy-area">
            <p id="phoneText">{{ phoneNumber }}</p>
            <app-copy-text [text]="phoneNumber"></app-copy-text>
          </div>
        </div>
      </div>
      <div class="contact-form hiddenAnimate from-right">
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
  styles: [
    `
      section {
        display: flex;
        gap: 2rem;
        overflow-x: hidden;
      }

      section > *:nth-child(1) {
        flex: 1 1 40%;
      }

      section > *:nth-child(2) {
        flex: 1 1 60%;
      }

      .contact-information-item {
        display: flex;
        margin-top: 1.5rem;
      }

      .contact-information-item > img {
        margin-right: 1rem;
      }

      .contact-information-item-copy-area {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }

      @media (max-width: 768px) {
        section {
          flex-direction: column;
          text-align: center;
        }
      }
    `,
  ],
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
    this.cs.submitData$.pipe(takeUntilDestroyed()).subscribe({
      next: () => {
        this.ms.open(this.thankYouTemplate());
      },
      error: () => {
        this.ms.open(this.sorryTemplate());
      },
    });
  }
}
