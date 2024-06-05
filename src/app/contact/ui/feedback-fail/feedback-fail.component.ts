import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/ui/components/custom-button/button';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';

@Component({
  selector: 'app-feedback-fail',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  template: `
    <div class="submit-modal-content">
      <img src="assets/images/icons/pensive-face.svg" alt="Heart Eyes Emoji" />
      <h5>Sorry.</h5>
      <p>The message was not sent. Please try again next time</p>
      <button
        custom-button
        disableEffect
        (click)="ms.close()"
        style="-webkit-tap-highlight-color: transparent"
      >
        OK
      </button>
    </div>
  `,
  styleUrls: ['./../feedback.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFailComponent {
  protected ms = inject(ModalService);
}
