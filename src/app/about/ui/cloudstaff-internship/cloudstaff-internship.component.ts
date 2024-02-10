import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';
import { TooltipDirective } from '../../../shared/ui/components/tooltip/tooltip.directive';

@Component({
  selector: 'app-cloudstaff-internship',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './cloudstaff-internship.component.html',
  styleUrls: ['./cloudstaff-internship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudstaffInternshipComponent {
  ts = inject(ThemeService);
  ms = inject(ModalService);
}
