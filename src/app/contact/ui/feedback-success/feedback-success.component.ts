import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/ui/components/custom-button/button';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';

@Component({
  selector: 'app-feedback-success',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  templateUrl: './feedback-success.component.html',
  styleUrls: ['./feedback-success.component.scss', './../feedback.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSuccessComponent {
  protected ms = inject(ModalService);
}
