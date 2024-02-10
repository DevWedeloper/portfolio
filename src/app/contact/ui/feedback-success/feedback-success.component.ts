import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';

@Component({
  selector: 'app-feedback-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-success.component.html',
  styleUrls: ['./feedback-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSuccessComponent {
  ms = inject(ModalService);
}
