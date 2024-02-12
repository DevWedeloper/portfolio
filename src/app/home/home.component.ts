import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SectionService } from '../shared/data-access/section.service';
import { TypeEffectService } from '../shared/data-access/type-effect.service';
import { CustomAnchorComponent } from '../shared/ui/components/custom-button/button';
import { HighlightTextDirective } from '../shared/ui/directives/highlight-text.directive';
import { HomeHeroImageComponent } from './ui/home-hero-image/home-hero-image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HighlightTextDirective,
    HomeHeroImageComponent,
    CustomAnchorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private ss = inject(SectionService);
  private tes = inject(TypeEffectService);
  private elementRef = inject(ElementRef);
  @HostBinding('attr.id') protected id = 'home';
  @HostBinding('class.section') protected wrapperClass = true;
  protected typeEffect = new BehaviorSubject<string>('');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.ss.registerSection(this.elementRef);
    if (isPlatformBrowser(this.platformId)) {
      this.tes.addTypeEffect(
        {
          phrases: ['Software Engineer!', 'Full-stack Engineer!'],
          typeSpeed: 55,
          reverseSpeed: 40,
          reverseDelay: 1000,
          loop: true,
        },
        this.typeEffect,
      );
    }
  }
}
