import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';
import { ModalComponent } from '../../../shared/ui/components/modal/modal.component';
import { ModalService } from '../../../shared/ui/components/modal/modal.service';
import { TabsComponent } from '../../../shared/ui/components/tabs/tabs.component';
import { TooltipDirective } from '../../../shared/ui/components/tooltip/tooltip.directive';
import { HighlightTextDirective } from '../../../shared/ui/directives/highlight-text.directive';
import { CloudstaffInternshipComponent } from '../cloudstaff-internship/cloudstaff-internship.component';

@Component({
  selector: 'app-about-tab',
  standalone: true,
  imports: [
    CommonModule,
    TabsComponent,
    HighlightTextDirective,
    TooltipDirective,
    ModalComponent,
    CloudstaffInternshipComponent,
  ],
  templateUrl: './about-tab.component.html',
  styleUrls: ['./about-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutTabComponent {
  protected ts = inject(ThemeService);
  protected ms = inject(ModalService);
  protected tabs: string[] = ['Skills', 'Experience', 'Education'];
  protected activatedTab = 'Skills';

  tabChange(tabIndex: string) {
    this.activatedTab = tabIndex;
  }
}
