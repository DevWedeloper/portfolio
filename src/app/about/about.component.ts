import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  inject
} from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';
import { ModalComponent } from '../shared/ui/components/modal/modal.component';
import { ModalService } from '../shared/ui/components/modal/modal.service';
import { TabsComponent } from '../shared/ui/components/tabs/tabs.component';
import { TooltipDirective } from '../shared/ui/components/tooltip/tooltip.directive';
import { HighlightTextDirective } from '../shared/ui/directives/highlight-text.directive';
import { AboutHeroImageComponent } from './ui/about-hero-image/about-hero-image.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TabsComponent,
    HighlightTextDirective,
    TooltipDirective,
    ModalComponent,
    AboutHeroImageComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  ts = inject(ThemeService);
  sectionService = inject(SectionService);
  ms = inject(ModalService);
  elementRef = inject(ElementRef);
  @HostBinding('attr.id') id = 'about';
  @HostBinding('class.section') wrapperClass = true;
  tabs: string[] = ['Skills', 'Experience', 'Education'];
  activatedTab = 'Skills';

  ngOnInit(): void {
    this.sectionService.registerSection(this.elementRef);
  }
  
  tabChange(tabIndex: string) {
    this.activatedTab = tabIndex;
  }
}
