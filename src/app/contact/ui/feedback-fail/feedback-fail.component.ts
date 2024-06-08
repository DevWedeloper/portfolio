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
  selector: 'app-feedback-fail',
  standalone: true,
  imports: [CustomButtonComponent],
  template: `
    <div class="${feedback}">
      <img
        class="${feedbackIcon}"
        src="assets/images/icons/pensive-face.svg"
        alt="Heart Eyes Emoji"
      />
      <h5 class="${feedbackHeading}">Sorry.</h5>
      <p class="${feedbackText}">
        The message was not sent. Please try again next time
      </p>
      <button
        class="${feedbackButton}"
        custom-button
        disableEffect
        (click)="ms.close()"
        style="-webkit-tap-highlight-color: transparent"
      >
        OK
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFailComponent {
  protected ms = inject(ModalService);
}
