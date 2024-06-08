import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/ui/components/custom-button/button';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';
import {
  feedback,
  feedbackButton,
  feedbackHeading,
  feedbackIcon,
  feedbackText,
} from '../feedback';

@Component({
  selector: 'app-feedback-success',
  standalone: true,
  imports: [CustomButtonComponent],
  template: `
    <div class="${feedback}">
      <img
        class="${feedbackIcon}"
        src="assets/images/icons/heart-eyes.svg"
        alt="Heart Eyes Emoji"
      />
      <h5 class="${feedbackHeading}">Thank You!</h5>
      <p class="${feedbackText}">
        The message was sent. Your feedback will help shape me to become a
        better developer. Thanks!
      </p>
      <button
        class="${feedbackButton}"
        custom-button
        disableEffect
        (click)="ms.close()"
        style="-webkit-tap-highlight-color: transparent"
      >
        Cool!
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSuccessComponent {
  protected ms = inject(ModalService);
}
