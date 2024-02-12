import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';

@Component({
  selector: 'app-feedback-fail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-fail.component.html',
  styleUrls: ['./feedback-fail.component.scss', './../feedback.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFailComponent {
  ms = inject(ModalService);
}
