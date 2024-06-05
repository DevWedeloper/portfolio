import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/ui/components/custom-button/button';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';

@Component({
  selector: 'app-feedback-success',
  standalone: true,
  imports: [CustomButtonComponent],
  template: `
    <div class="submit-modal-content">
      <img src="assets/images/icons/heart-eyes.svg" alt="Heart Eyes Emoji" />
      <h5>Thank You!</h5>
      <p>
        The message was sent. Your feedback will help shape me to become a
        better developer. Thanks!
      </p>
      <button
        custom-button
        disableEffect
        (click)="ms.close()"
        style="-webkit-tap-highlight-color: transparent"
      >
        Cool!
      </button>
    </div>
  `,
  styleUrls: ['./../feedback.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSuccessComponent {
  protected ms = inject(ModalService);
}
