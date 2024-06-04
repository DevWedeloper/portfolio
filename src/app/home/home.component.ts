import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  viewChild
} from '@angular/core';
import { TypeEffectService } from '../shared/data-access/type-effect.service';
import { CustomAnchorComponent } from '../shared/ui/components/custom-button/button';
import { MainSectionDirective } from '../shared/ui/components/main-section.directive';
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
    MainSectionDirective,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': '\'home\'',
    '[class.section]': 'true',
    '[attr.appMainSection]': 'true',
  },
})
export class HomeComponent {
  private tes = inject(TypeEffectService);
  private typeEffectTarget =
    viewChild.required<ElementRef<HTMLElement>>('typeEffectTarget');

  constructor() {
    afterNextRender(() => {
      this.tes.addTypeEffect(
        {
          phrases: ['Software Engineer!', 'Full-stack Engineer!'],
          typeSpeed: 55,
          reverseSpeed: 40,
          reverseDelay: 1000,
          loop: true,
        },
        this.typeEffectTarget(),
      );
    });
  }
}
