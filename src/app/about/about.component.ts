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
import { AboutHeroImageComponent } from './ui/about-hero-image/about-hero-image.component';
import { AboutTabComponent } from './ui/about-tab/about-tab.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    AboutHeroImageComponent,
    AboutTabComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  sectionService = inject(SectionService);
  elementRef = inject(ElementRef);
  @HostBinding('attr.id') id = 'about';
  @HostBinding('class.section') wrapperClass = true;

  ngOnInit(): void {
    this.sectionService.registerSection(this.elementRef);
  }
}
