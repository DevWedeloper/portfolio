import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/ui/components/custom-button/button';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';

@Component({
  selector: 'app-feedback-fail',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  templateUrl: './feedback-fail.component.html',
  styleUrls: ['./feedback-fail.component.scss', './../feedback.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFailComponent {
  protected ms = inject(ModalService);
}
