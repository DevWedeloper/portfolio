import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from 'src/app/shared/data-access/theme.service';
import { ModalComponent } from 'src/app/shared/ui/components/modal/modal.component';
import { ModalService } from 'src/app/shared/ui/components/modal/modal.service';
import { TabsComponent } from 'src/app/shared/ui/components/tabs/tabs.component';
import { TooltipDirective } from 'src/app/shared/ui/components/tooltip/tooltip.directive';
import { HighlightTextDirective } from 'src/app/shared/ui/directives/highlight-text.directive';
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
    CloudstaffInternshipComponent
  ],
  templateUrl: './about-tab.component.html',
  styleUrls: ['./about-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutTabComponent {
  ts = inject(ThemeService);
  ms = inject(ModalService);
  tabs: string[] = ['Skills', 'Experience', 'Education'];
  activatedTab = 'Skills';

  tabChange(tabIndex: string) {
    this.activatedTab = tabIndex;
  }
}
